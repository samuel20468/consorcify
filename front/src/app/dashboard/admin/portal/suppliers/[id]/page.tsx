"use client";

// Estilos y componentes
import { ContainerDashboard, Title } from "@/components/ui";

// Endpoints
import { getSupplierById } from "@/helpers/fetch.helper.supplier";

// Interfaces
<<<<<<< HEAD
=======
import { ISupplier } from "@/Interfaces/suppliers.interfaces";
>>>>>>> develop

// Hooks
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import { ISupplier } from "@/Interfaces/suppliers.interfaces";

// -------------------

const Supplier = () => {
    useAuth();
    const { token } = useSesion();
    const params: { id: string } = useParams();
    const [suppliers, setSuppliers] = useState<ISupplier>();
    const path = usePathname();

    useEffect(() => {
        const fecthData = async () => {
            try {
                const response = await getSupplierById(params.id, token);
                if (response) {
                    const data = await response.json();
                    setSuppliers(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fecthData();
        }
    }, [path, token, params.id]);

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
