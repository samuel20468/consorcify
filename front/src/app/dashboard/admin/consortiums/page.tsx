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
        <div className="h-screen text-white">
            <ContainerDashboard>
                <Title>Consorcios</Title>
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
                    className="flex justify-center w-1/6"
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
