"use client";

// Estilos y componentes
import { Button, ContainerDashboard, Title } from "@/components/ui";

// Hooks
import useAuth from "@/helpers/useAuth";
import Link from "next/link";

// -----------------

const Portal = () => {
    useAuth();

    return (
        <div className="h-screen text-black bg-gray-100">
            <ContainerDashboard>
                <Title>Portal</Title>
                <div className="flex flex-col w-[90%]">
                    <div className="flex justify-center gap-2 pb-2">
                        <Button className="rounded-[40px] w-1/3 py-10 text-center">
                            Amenities
                        </Button>
                        <Link href="portal/suppliers" className="w-1/3">
                            <Button className="rounded-[40px] w-full py-10 text-center">
                                <span>Proveedores</span>
                            </Button>
                        </Link>
                        <Button className="rounded-[40px] w-1/3 py-10 text-center">
                            Documentos
                        </Button>
                    </div>
                    <div className="flex justify-center gap-2">
                        <Button className="rounded-[40px] w-1/3 py-10 text-center">
                            Novedades
                        </Button>
                        <Button className="rounded-[40px] w-1/3 py-10 text-center">
                            Votaciones
                        </Button>
                    </div>
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default Portal;
