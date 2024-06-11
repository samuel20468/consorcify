"use client";

// Estilos y componentes
import { ContainerDashboard, Title } from "@/components/ui";

// Endpoints
import { getSuppliersById } from "@/helpers/fetch.helper";

// Interfaces
import { ISuppliers } from "@/Interfaces/Interfaces";

// Hooks
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";

// -------------------

const Supplier = () => {
    useAuth();
    const { token } = useSesion();
    const params: { id: string } = useParams();
    const [suppliers, setSuppliers] = useState<ISuppliers>();
    const path = usePathname();

    useEffect(() => {
        const fecthData = async () => {
            try {
                const response = await getSuppliersById(params.id, token);
                if (response) {
                    setSuppliers(response);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fecthData();
        }
    }, [path, token]);

    return (
        <div className="h-screen text-white">
            <ContainerDashboard>
                <Title>
                    Portal{" "}
                    <span className="text-2xl font-thin">
                        | Proveedores |{" "}
                        <span className="text-xl font-thin">
                            {suppliers?.name}
                        </span>
                    </span>
                </Title>
                <div className="bg-red-200 flex flex-col justify-center h-[50%] w-[30%] text-center rounded-2xl gap-4">
                    <h1 className="text-xl">Proveedor: {suppliers?.name}</h1>
                    <p>Dirección: {suppliers?.address}</p>
                    <p>Saldo: ${suppliers?.balance}</p>
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default Supplier;
