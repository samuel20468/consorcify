// Estilos y componentes
import { ContainerDashboard, Title } from "../ui";
import Footer from "../Footer/Footer";

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

    console.log(data);

    useEffect(() => {
        const fecthData = async () => {
            try {
                const response = await getAdminById(data, token);
                console.log(response);

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
    }, [token]);

    return (
        <ContainerDashboard>
            <Title>Mi Administración</Title>
            <div className="grid w-full h-auto grid-cols-1 gap-10 p-4 text-black">
                <div className="h-24 bg-gray-100 rounded-[50px] flex justify-center items-center">
                    <h1 className="text-2xl">{admin?.name}</h1>
                </div>
            </div>
            <div className="grid w-full h-auto grid-cols-1 gap-10 p-4 my-10 text-black md:grid-cols-2 lg:grid-cols-3">
                <Link
                    href="/addConsortium"
                    className="flex justify-center items-end text-2xl bg-gray-100 hover:bg-gray-200 h-72 rounded-[50px] pb-2"
                >
                    Agregar consorcio
                </Link>
                <Link
                    href="#"
                    className="flex justify-center items-end text-2xl bg-gray-100 hover:bg-gray-200 h-72 rounded-[50px] pb-2"
                >
                    Opcion 2
                </Link>
                <Link
                    href="#"
                    className="flex justify-center items-end text-2xl bg-gray-100 hover:bg-gray-200 h-72 rounded-[50px] pb-2"
                >
                    Opcion 3
                </Link>
            </div>
            <div className="grid w-full h-auto grid-cols-1 gap-10 p-4 mb-4 text-black md:grid-cols-2">
                <div className="h-24 bg-gray-100 rounded-[50px] flex justify-center items-center">
                    <h1 className="text-2xl">Detalle 1</h1>
                </div>
                <div className="h-24 bg-gray-100 rounded-[50px] flex justify-center items-center">
                    <h1 className="text-2xl">Detalle 2</h1>
                </div>
            </div>
            <div className="w-full">
                <Footer />
            </div>
        </ContainerDashboard>
    );
};

export default DashboardA;
