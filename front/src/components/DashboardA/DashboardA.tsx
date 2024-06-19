// Estilos y componentes
import './style.css';
import { ContainerDashboard, Title } from '../ui';
import { BsBuildingFillAdd } from 'react-icons/bs';
import { GrUserWorker } from 'react-icons/gr';
import { FaMoneyBillTransfer } from 'react-icons/fa6';

// Interfaces
import { IAdmin } from '@/Interfaces/admin.interfaces';

// Endpoints
import { getAdminById } from '@/helpers/fetch.helper.admin';

// Hooks
import { useEffect, useState } from 'react';
import useAuth from '@/helpers/useAuth';
import useSesion from '@/helpers/useSesion';
import Link from 'next/link';

// ------------------

const DashboardA = () => {
    useAuth();
    const { token, data } = useSesion();
    const [admin, setAdmin] = useState<IAdmin>();

    useEffect(() => {
        const fecthData = async () => {
            try {
                const response = await getAdminById(data.id, token);
                if (response) {
                    const data = await response.json();
                    setAdmin(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fecthData();
        }
    }, [token, data]);

    return (
        <div className="h-screen text-white">
            <ContainerDashboard>
                <Title>{admin?.name}</Title>
                <div className="grid w-full h-auto grid-cols-1 gap-10 px-4 py-[7%] text-black md:grid-cols-2 lg:grid-cols-3 ">
                    <Link
                        href="/addConsortium"
                        className="flex flex-col items-center justify-center text-3xl text-white border rounded-[40px] pb-2 gradiente shadow-[0_3px_10px_rgb(255,255,255,0.8)]"
                    >
                        <BsBuildingFillAdd size={100} />
                        <h3 className="text-2xl font-bold mt-4 mb-1">
                            Agregar un consorcio
                        </h3>
                        <p className=" text-base text-center w-2/3">
                            Inicia un nuevo consorcio con gestión eficiente y
                            transparente.
                        </p>
                    </Link>
                    <Link
                        href="/addSupplier"
                        className="flex flex-col items-center justify-center text-3xl text-white border rounded-[40px] pb-2 gradiente shadow-[0_3px_10px_rgb(255,255,255,0.8)]"
                    >
                        <GrUserWorker size={100} />
                        <h3 className="text-2xl font-bold mt-4 mb-1">
                            Agregar un proveedor
                        </h3>
                        <p className=" text-base text-center w-2/3">
                            Agregar un proveedor a tu lista para poder
                            mantenerla actualizada.
                        </p>
                    </Link>
                    <Link
                        href="/addSpent"
                        className="flex flex-col items-center justify-center text-3xl text-white border rounded-[40px] pb-2 gradiente shadow-[0_3px_10px_rgb(255,255,255,0.8)]"
                    >
                        <FaMoneyBillTransfer size={100} />
                        <h3 className="text-2xl font-bold mt-4 mb-1">
                            Agregar un gasto
                        </h3>
                        <p className=" text-base text-center w-2/3">
                            Agrega un gasto para poder llevar un registro
                            exitoso de los movimientos del consorcio.
                        </p>
                    </Link>
                </div>
                <div className="w-full h-auto gap-10 p-4 mb-4 text-white md:grid-cols-2">
                    <div className="h-24 flex justify-center items-center border-t">
                        <h1 className="text-2xl font-thin">
                            Trabajar con nosotros fomenta una comunidad unida y
                            organizada.
                        </h1>
                    </div>
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default DashboardA;
