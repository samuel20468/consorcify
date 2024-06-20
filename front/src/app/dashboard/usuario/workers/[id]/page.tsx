'use client';

// Estilos y componentes
import { ContainerDashboard, Title } from '@/components/ui';
import { formatMoney, formatearNumero } from '@/helpers/functions.helper';
import Map from '@/components/Map/Map';

// Endpoints
import { getSupplierById } from '@/helpers/fetch.helper.supplier';

// Interfaces
import { ISupplier } from '@/Interfaces/suppliers.interfaces';

// Hooks
import { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import useAuth from '@/helpers/useAuth';
import useSesion from '@/helpers/useSesion';

// -------------------

const Supplier = () => {
    useAuth();
    const { token } = useSesion();
    const params: { id: string } = useParams();
    const [suppliers, setSuppliers] = useState<ISupplier>();
    const path = usePathname();

    useEffect(() => {
        const fecthData = async () => {
            try {
                const response = await getSupplierById(token, params.id);
                if (response) {
                    const data = await response.json();
                    setSuppliers(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fecthData();
        }
    }, [path, token, params.id]);

    return (
        <div className="h-screen">
            <ContainerDashboard>
                <Title>
                    Portal{' '}
                    <span className="text-2xl font-thin">
                        | Proveedores |{' '}
                        <span className="text-xl font-thin">
                            {suppliers?.name}
                        </span>
                    </span>
                </Title>
                <div className="flex p-4 mt-5 border w-[950px] h-[500px] rounded-[50px]">
                    <div className="w-1/3">
                        {suppliers && (
                            <Map
                                lat={suppliers.latitude}
                                lng={suppliers.longitude}
                            />
                        )}
                    </div>
                    <div className="flex flex-col justify-around items-center w-2/3">
                        <div className="w-[80%] px-5 pb-3 border-b text-center">
                            <h1 className="text-4xl font-bold">
                                {suppliers?.name}
                            </h1>
                        </div>
                        <div>
                            <h1 className="text-2xl font-extralight">
                                CUIT:{' '}
                                <span className="font-bold">
                                    {formatearNumero(suppliers?.cuit)}
                                </span>
                            </h1>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-xl text-center">Dirección:</h1>
                            <h1 className="text-2xl font-extralight">
                                {suppliers?.address}
                            </h1>
                        </div>
                        <div className="flex justify-evenly w-full">
                            <div className="flex flex-col">
                                <h1 className="text-xl text-center">Email:</h1>
                                <h1 className="text-2xl font-extralight">
                                    {suppliers?.email}
                                </h1>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-xl text-center">
                                    Teléfono:
                                </h1>{' '}
                                <h1 className="text-2xl font-extralight">
                                    {suppliers?.phone_number}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default Supplier;
