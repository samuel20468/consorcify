'use client';

// Estilos y componentes
import { ContainerDashboard, Title } from '@/components/ui';
import {
    formatDate,
    formatFactura,
    formatMoney,
} from '@/helpers/functions.helper';

// Endpoints
import { getExpeditureById } from '@/helpers/fetch.helper.expenditure';

// Interfaces
import { IExpenditure } from '@/Interfaces/expenditures.interfaces';

// Hooks
import { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import useAuth from '@/helpers/useAuth';
import useSesion from '@/helpers/useSesion';

// --------------------

const ExpenditureId = () => {
    useAuth();
    const { token } = useSesion();
    const pathname = usePathname();
    const params: { id: string } = useParams();
    const [expenditure, setExpenditure] = useState<IExpenditure>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getExpeditureById(token, params.id);
                if (response) {
                    const data = await response.json();
                    setExpenditure(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fetchData();
        }
    }, [token, params.id, pathname]);

    return (
        <div className="h-screen">
            <ContainerDashboard>
                <Title>
                    Gastos{' '}
                    <span className="text-xl font-thin">
                        | Detalle de gasto
                    </span>
                </Title>
                <div className="flex flex-col justify-around items-center p-4 mt-5 border w-[900px] h-[400px] rounded-[40px]">
                    <div className="pb-5 px-5 text-center border-b w-full ">
                        <h1 className="text-4xl font-bold">
                            {expenditure?.supplier.name}
                        </h1>
                    </div>

                    <div>
                        <h1 className="text-3xl font-extralight">
                            Descripción del servicio:{' '}
                            <span className="font-bold">
                                {expenditure?.description}
                            </span>
                        </h1>
                    </div>

                    <div className="flex justify-around w-full">
                        <div className="flex flex-col">
                            <h1 className="text-xl text-center">Fecha:</h1>
                            <h1 className="text-2xl font-extralight">
                                {formatDate(expenditure?.date)}
                            </h1>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-xl text-center">
                                Número de factura:
                            </h1>{' '}
                            <h1 className="text-2xl font-extralight">
                                {expenditure?.invoice_number
                                    ? formatFactura(expenditure.invoice_number)
                                    : 'No disponible'}
                            </h1>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-xl text-center">Categoría:</h1>{' '}
                            <h1 className="text-2xl font-extralight">
                                {expenditure?.category}
                            </h1>
                        </div>
                    </div>

                    <div className="flex justify-evenly w-full">
                        <div className="flex flex-col">
                            <h1 className="text-xl text-center">Total:</h1>{' '}
                            <h1 className="text-2xl font-extralight">
                                {formatMoney(expenditure?.total_amount)}
                            </h1>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="flex flex-col">
                                <h1 className="text-xl text-center">
                                    Estado del gasto:
                                </h1>
                                <h1
                                    className={`text-2xl font-extralight text-center ${
                                        expenditure?.status === 'impago'
                                            ? 'text-redd'
                                            : 'text-greenn'
                                    }`}
                                >
                                    {expenditure?.status}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default ExpenditureId;
