'use client';

// Estilos y componentes
import { Button, ContainerDashboard, Title } from '@/components/ui';

// Endpoints
import { getConsortiums } from '@/helpers/fetch.helper';

// Interfaces
import { IConsortium } from '@/Interfaces/Interfaces';

// Hooks
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import useAuth from '@/helpers/useAuth';
import useSesion from '@/helpers/useSesion';
import ConsorCards from '@/components/ConsorCards/ConsorCards';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar/SearchBar';

// ----------------------

const Consortium = () => {
    useAuth();
    const [consortiums, setConsortiums] = useState<IConsortium[]>([]);
    const [result, setResult] = useState<IConsortium[]>([]);
    const { token } = useSesion();
    const pathname = usePathname();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getConsortiums(token);
                if (response) {
                    const data = await response.json();
                    setConsortiums(data);
                    setResult(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fetchData();
        }
    }, [token, pathname]);

    const handleSearch = (query: string) => {
        const trimmedQuery = query.trim().toLocaleLowerCase();

        if (!trimmedQuery) {
            setResult(consortiums || []);
            return;
        }

        const filteredData = (consortiums || []).filter(
            (consortium: IConsortium) => {
                return Object.values(consortium).some((value) => {
                    return (
                        typeof value === 'string' &&
                        value.toLocaleLowerCase().includes(trimmedQuery)
                    );
                });
            }
        );

        setResult(filteredData);
    };

    const handleSort = (field: keyof IConsortium, order: 'asc' | 'desc') => {
        const sortedData = [...result].sort((a, b) => {
            const valueA = a[field];
            const valueB = b[field];

            if (typeof valueA === 'string' && typeof valueB === 'string') {
                return order === 'asc'
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            } else if (
                typeof valueA === 'number' &&
                typeof valueB === 'number'
            ) {
                return order === 'asc' ? valueA - valueB : valueB - valueA;
            } else {
                return 0;
            }
        });

        setResult(sortedData);
    };

    return (
        <div className="h-screen bg-fondo">
            <ContainerDashboard>
                <Title>Consorcios</Title>
                <div className="w-full mb-10">
                    <SearchBar onSearch={handleSearch} />
                </div>
                <div className="w-[90%] h-full flex gap-3 px-10 bg-[#d3d3d3] p-3 items-center">
                    <div className="flex items-center justify-center w-full gap-3 ">
                        <p className="text-lg text-black">Filtrar por:</p>
                        <select
                            className="h-10 p-2 my-1 text-gray-200 rounded-md shadow-xl bg-input placeholder:font-extralight placeholder:text-gray-500 focus:outline-none no-spinners"
                            onChange={(e) =>
                                handleSort(
                                    e.target.value as keyof IConsortium,
                                    'asc'
                                )
                            }
                        >
                            <option value="name">Nombre</option>
                            <option value="cuit">CUIT</option>
                            <option value="street_name">Calle</option>
                            <option value="building_number">
                                Número de Edificio
                            </option>
                            <option value="zip_code">Código Postal</option>
                            <option value="country">País</option>
                            <option value="province">Provincia</option>
                            <option value="city">Ciudad</option>
                            <option value="floors">Pisos</option>
                            <option value="ufs">Unidades Funcionales</option>
                            <option value="category">Categoría</option>
                            <option value="first_due_day">
                                Primer Día de Vencimiento
                            </option>
                        </select>
                    </div>

                    <select
                        className="h-10 p-2 my-1 text-gray-200 rounded-md shadow-xl bg-input placeholder:font-extralight placeholder:text-gray-500 focus:outline-none no-spinners"
                        onChange={(e) =>
                            handleSort('name', e.target.value as 'asc' | 'desc')
                        }
                    >
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                    <div className="flex justify-end w-full px-3">
                        <Link href="/dashboard/superadmin/consorcios">
                            <Button className="w-20 py-2 rounded-[40px]">
                                Volver
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="w-[90%] border-t border-b border-white flex justify-around p-2 my-5 text-center">
                    <h1>Nombre</h1>
                    <h1>CUIT</h1>
                    <h1>Dirección</h1>
                    <h1>UFs</h1>
                    <h1>Deuda</h1>
                </div>
                {consortiums.length > 0 ? (
                    <ConsorCards consortiums={result} />
                ) : (
                    <div className="p-8">
                        <h1 className="text-2xl">
                            Aún no hay consorcios registrados
                        </h1>
                    </div>
                )}
                <Link
                    className="flex justify-center w-1/6 mt-4"
                    href={'/addConsortium'}
                >
                    <Button className="w-full p-2 rounded-xl">
                        Agregar consorcio
                    </Button>
                </Link>
            </ContainerDashboard>
        </div>
    );
};

export default Consortium;
