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
        <ContainerDashboard className="bg-gray-100 h-screen">
            <Title>{suppliers?.name}</Title>
        </ContainerDashboard>
    );
};

export default Supplier;
