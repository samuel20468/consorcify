"use client";

// Estilos y componentes
import { Button, ContainerDashboard, Title } from "@/components/ui";
import { BsFillBuildingsFill } from "react-icons/bs";
import { BsBuildingFillAdd } from "react-icons/bs";

// Hooks
import useAuth from "@/helpers/useAuth";
import Link from "next/link";

const ConsorciosCrud = () => {
    useAuth();
    return (
        <div className="flex items-center justify-center w-full h-screen gap-3 text-white">
            <ContainerDashboard className="w-full h-full">
                <Title>Consorcios</Title>
                <div className="flex items-center justify-between w-1/2 gap-4 h-3/4">
                    <div className="w-full max-w-sm overflow-hidden bg-[#d3d3d3] rounded-[40px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-6">
                        <div className="flex flex-col items-center p-4 space-y-2">
                            <BsBuildingFillAdd size={200} color="black" />
                            <Link href="/addConsortium">
                                <Button className="py-2 mt-10 font-medium duration-500 rounded-[40px] p-4">
                                    Crear Consorcio
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="w-full max-w-sm overflow-hidden bg-[#d3d3d3] rounded-[40px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-6">
                        <div className="flex flex-col items-center p-4 space-y-2">
                            <BsFillBuildingsFill size={200} color="black" />
                            <Link href="/dashboard/superadmin/consorcios/All">
                                <Button className="py-2 mt-10 font-medium duration-500 rounded-[40px] p-4">
                                    Ver Consorcios
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
