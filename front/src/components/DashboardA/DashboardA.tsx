// Estilos y componentes
import { ContainerDashboard, Title } from "../ui";
import { BsBuildingFillAdd } from "react-icons/bs";
import { GrUserWorker } from "react-icons/gr";
import { FaMoneyBillTransfer } from "react-icons/fa6";

// Interfaces
import { IAdmin } from "@/Interfaces/Interfaces";

// Endpoints
import { getAdminById } from "@/helpers/fetch.helper";

// Hooks
import { useEffect, useState } from "react";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import Link from "next/link";

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
    }, [token, data.id]);

    return (
        <div className="h-screen text-white">
            <ContainerDashboard>
                <Title>Mi Administración</Title>
                <div className="grid w-full h-auto grid-cols-1 gap-10 p-4 text-black">
                    <div className="h-24 bg-white rounded-[50px] flex justify-center items-center">
                        <h1 className="text-2xl">{admin?.name}</h1>
                    </div>
                </div>
                <div className="grid w-full h-auto grid-cols-1 gap-10 p-4 my-10 text-black md:grid-cols-2 lg:grid-cols-3">
                    <Link
                        href="/addConsortium"
                        className="flex flex-col items-center justify-center text-2xl bg-white hover:bg-gray-200 h-72 rounded-[50px] pb-2"
                    >
                        <BsBuildingFillAdd size={120} />
                        <h1 className="mt-3">Agregar consorcio</h1>
                    </Link>
                    <Link
                        href="/addSupplier"
                        className="flex flex-col items-center justify-center text-2xl bg-white hover:bg-gray-200 h-72 rounded-[50px] pb-2"
                    >
                        <GrUserWorker size={120} />
                        <h1 className="mt-3">Agregar proveedor</h1>
                    </Link>
                    <Link
                        href="/addSpent"
                        className="flex flex-col items-center justify-center text-2xl bg-white hover:bg-gray-200 h-72 rounded-[50px] pb-2"
                    >
                        <FaMoneyBillTransfer size={120} />

                        <h1 className="mt-3">Agregar gasto</h1>
                    </Link>
                </div>
                <div className="grid w-full h-auto grid-cols-1 gap-10 p-4 mb-4 text-black md:grid-cols-2">
                    <div className="h-24 bg-white rounded-[50px] flex justify-center items-center">
                        <h1 className="text-2xl">Detalle 1</h1>
                    </div>
                    <div className="h-24 bg-white rounded-[50px] flex justify-center items-center">
                        <h1 className="text-2xl">Detalle 2</h1>
                    </div>
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default DashboardA;
