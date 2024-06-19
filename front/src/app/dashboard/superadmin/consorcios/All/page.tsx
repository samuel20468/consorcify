'use client';

// Estilos y componentes
import { Button, ContainerDashboard, Title } from '@/components/ui';
import SearchBar from '@/components/SearchBar/SearchBar';
import ConsortiumCard from '@/components/ConsortiumCard/ConsortiumCard';

// Endpoints
import { getConsortiums } from '@/helpers/fetch.helper.consortium';

// Interfaces
import { IConsortium } from '@/Interfaces/consortium.interfaces';

// Hooks
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import useAuth from '@/helpers/useAuth';
import useSesion from '@/helpers/useSesion';
import Link from 'next/link';

// ---------------------------

const Page = () => {
    useAuth();
    const { token } = useSesion();
    const [consortiums, setConsortiums] = useState<IConsortium[]>([]);
    const [result, setResult] = useState<IConsortium[]>([]);

    const path = usePathname();

    useEffect(() => {
        const fetchData = async (token: string) => {
            const response = await getConsortiums(token);

            if (response) {
                const data = await response.json();
                setConsortiums(data);
                setResult(data);
            }
        };
        if (token) {
            fetchData(token);
        }
    }, [token, path]);

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
        <div className="h-screen text-white">
            <ContainerDashboard>
                <Title>
                    Consorcios{' '}
                    <span className="text-2xl font-thin">
                        | Todos los consorcios
                    </span>
                </Title>
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
                            <option value="street_name">Calle</option>
                            <option value="city">Ciudad</option>
                            <option value="province">Provincia</option>
                            <option value="country">País</option>
                            <option value="zip_code">Código Postal</option>
                            <option value="category">Categoría</option>
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
                <div className="w-full flex flex-wrap justify-center items-center my-6">
                    {result?.map((consortium: IConsortium) => (
                        <Link
                            key={consortium.id}
                            href={`/dashboard/superadmin/consorcios/All/${consortium.id}`}
                            className="flex flex-col items-center justify-center w-[45%] my-4"
                        >
                            <ConsortiumCard consortium={consortium} />
                        </Link>
                    ))}
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default Page;
