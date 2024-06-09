"use client";

// Estilos y componentes
import { Button, ContainerDashboard, Title } from "@/components/ui";
import { FaUsers } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";

// Hooks
import useAuth from "@/helpers/useAuth";
import Link from "next/link";

// ---------------

const ConsorciosCrud = () => {
    useAuth();

    return (
        <div className="flex items-center justify-center w-full h-screen gap-3 text-white">
            <ContainerDashboard className="w-full h-full">
                <Title>Administración</Title>
                <div className="flex items-center justify-between w-1/2 gap-4 h-3/4">
                    <div className="w-full max-w-sm overflow-hidden bg-[#d3d3d3] rounded-[40px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-6">
                        <div className="flex flex-col items-center p-4 space-y-2">
                            <IoMdPersonAdd size={200} color="black" />
                            <Link href="/addAdministrator">
                                <Button className="py-2 mt-10 font-medium duration-500 rounded-[40px] p-4">
                                    Crear administrador
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="w-full max-w-sm overflow-hidden bg-[#d3d3d3] rounded-[40px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-6">
                        <div className="flex flex-col items-center p-4 space-y-2">
                            <FaUsers size={200} color="black" />
                            <Link href="/dashboard/superadmin/administracion/All">
                                <Button className="py-2 mt-10 font-medium duration-500 rounded-[40px] p-4">
                                    Ver Administradores
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default ConsorciosCrud;
