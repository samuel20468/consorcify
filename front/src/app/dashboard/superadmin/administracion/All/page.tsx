"use client";

// Estilos y componentes
import { ContainerDashboard, Title } from "@/components/ui";

// Interfaces
import { IAdmin } from "@/Interfaces/Interfaces";

// Endpoints
import { getAdmins } from "@/helpers/fetch.helper";

// Hooks
import { useEffect, useState } from "react";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import Link from "next/link";
import { useParams } from "next/navigation";

// -------------------

const page = () => {
    useAuth();
    const pathname = useParams();
    const { token } = useSesion();
    const [admins, setAdmins] = useState<IAdmin[]>([]);

    useEffect(() => {
        const fetchData = async (token: string) => {
            const response = await getAdmins(token);
            if (response) {
                const data = await response.json();
                setAdmins(data);
                console.log(data);
            }
        };
        if (token) {
            fetchData(token);
        }
    }, [token, pathname]);

    return (
        <div className="h-screen text-white">
            <ContainerDashboard>
                <Title>
                    Administración{" "}
                    <span className="text-2xl font-thin">
                        | Administraciones
                    </span>
                </Title>
                <div className="flex flex-col items-center justify-center w-full gap-4">
                    {admins?.length > 0 ? (
                        admins?.map((elemento) => {
                            return (
                                <Link
                                    key={elemento.id}
                                    href={`/dashboard/superadmin/administracion/All/${elemento.id}`}
                                    className="text-black flex w-3/4 rounded border border-black mx-2 p-3 bg-[#dadada] hover:scale-110 hover:transition hover:duration-700"
                                >
                                    <div className="flex justify-between w-full text-center">
                                        <p className="w-[33.33%]">
                                            {elemento.name}
                                        </p>
                                        <p className="w-[33.33%]">
                                            {elemento.cuit}
                                        </p>
                                        <p className="w-[33.33%]">
                                            {elemento.email}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <div>Todavia no hay administradores</div>
                    )}
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default page;
