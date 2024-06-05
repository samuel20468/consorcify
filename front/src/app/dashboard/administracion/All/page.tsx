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
import { usePathname } from "next/navigation";

// -------------------

const page = () => {
    useAuth();
    const [admins, setAdmins] = useState<IAdmin[]>([]);
    const token = useSesion();
    const path = usePathname();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAdmins(token);
                if (response) {
                    setAdmins(response);
                }
            } catch (error) {}
        };
        if (token) {
            fetchData();
        }
    }, [token]);

    return (
        <div className="flex w-full h-screen gap-3 bg-[#e5e7eb] text-black">
            <ContainerDashboard className="w-full flex flex-col bg-[#e5e7eb] p-5">
                <div className="flex items-start w-full">
                    <Title>Ver todas las administraciones</Title>
                </div>
                <div className="flex flex-col items-center justify-center w-full gap-4">
                    {admins?.length != 0 ? (
                        admins?.map((elemento) => {
                            return (
                                <Link
                                    key={elemento.id}
                                    href={`/dashboard/administracion/All/${elemento.id}`}
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
