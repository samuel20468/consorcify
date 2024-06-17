"use client";
import { ContainerDashboard } from "@/components/ui";
import { useUfSesion } from "@/helpers/useUfSesion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Workers = () => {
    const { haveUF, isLoading, functional_unit } = useUfSesion();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !haveUF) {
            router.push("/dashboard/usuario/addfuncionalunit");
        }
    }, [isLoading, haveUF, router]);

    if (isLoading) {
        return <div>Cargando...</div>;
    }
    return (
        <div>
            <ContainerDashboard>
                <h1 className="flex items-center justify-center m-auto">
                    Acá van a ir todos los proveedores
                </h1>
            </ContainerDashboard>
        </div>
    );
};
export default Workers;
