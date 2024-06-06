"use client";

// Estilos y componentes
import { Button, ContainerDashboard, Title } from "@/components/ui";
import { AddCross, AllAdmins } from "@/helpers/icons.helper";

// Hooks
import useAuth from "@/helpers/useAuth";
import Link from "next/link";

// ---------------

const ConsorciosCrud = () => {
    useAuth();

    return (
        <div className="flex w-full h-screen gap-3 bg-[#e5e7eb] text-black">
            <ContainerDashboard className="w-full h-full bg-[#e5e7eb]">
                <Title>Administración</Title>
                <div className="flex items-center justify-between w-1/2 gap-4 h-3/4">
                    <div className="flex flex-col items-center  w-1/2 py-2 border rounded-[50px] h-3/4 bg-[#dadada] shadow-2xl">
                        <AddCross className="flex items-center justify-center w-full h-full" />
                        <Link
                            href="/addAdministrator"
                            className="w-[80%] px-2 "
                        >
                            <Button>Nuevo Administrador</Button>
                        </Link>
                    </div>
                    <div className="flex flex-col items-center w-1/2 py-2 border rounded-[50px] h-3/4 bg-[#dadada] shadow-2xl">
                        <AllAdmins className="flex items-center justify-center w-full h-full" />
                        <Link
                            href="/dashboard/administracion/All"
                            className="w-[80%] px-2"
                        >
                            <Button>Ver Administradores</Button>
                        </Link>
                    </div>
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default ConsorciosCrud;
