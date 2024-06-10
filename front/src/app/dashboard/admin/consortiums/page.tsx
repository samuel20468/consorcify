"use client";

// Estilos y componentes
import { Button, ContainerDashboard, Title } from "@/components/ui";

// Endpoints
import { getConsortiums } from "@/helpers/fetch.helper";

// Interfaces
import { IConsortium } from "@/Interfaces/Interfaces";

// Hooks
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import ConsorCards from "@/components/ConsorCards/ConsorCards";
import Link from "next/link";

// ----------------------

const Consortium = () => {
    useAuth();
    const [consortiums, setConsortiums] = useState<IConsortium[]>([]);
    const { token } = useSesion();
    const pathname = usePathname();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getConsortiums(token);
                if (response) {
                    const data = await response.json();
                    setConsortiums(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fetchData();
        }
    }, [token, pathname]);

    return (
        <div className="h-screen bg-fondo">
            <ContainerDashboard>
                <Title>Consorcios</Title>
                <div className="w-[90%] border-t border-b border-white flex justify-around p-2 my-5 text-center">
                    <h1>Nombre</h1>
                    <h1>CUIT</h1>
                    <h1>Dirección</h1>
                    <h1>UFs</h1>
                    <h1>Deuda</h1>
                </div>
                {consortiums.length > 0 ? (
                    <ConsorCards consortiums={consortiums} />
                ) : (
                    <div className="p-8">
                        <h1 className="text-2xl">
                            Aún no hay consorcios registrados
                        </h1>
                    </div>
                )}
                <Link
                    className="flex justify-center w-1/6 mt-4"
                    href={"/addConsortium"}
                >
                    <Button className="w-full p-2 rounded-xl">
                        Agregar consorcio
                    </Button>
                </Link>
            </ContainerDashboard>
        </div>
    );
};

export default Consortium;
