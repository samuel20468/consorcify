"use client";

// Estilos y componentes
import { Button, ContainerDashboard, Title } from "@/components/ui";
import SuppliersCards from "@/components/SuppliersCards/SuppliersCards";

// Endpoints
import { getSuppliers } from "@/helpers/fetch.helper";

// Interfaces
import { ISuppliers } from "@/Interfaces/Interfaces";

// Hooks
import { useEffect, useState } from "react";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ------------------

const Supplies = () => {
    useAuth();
    const [suppliers, setSuppliers] = useState<ISuppliers[]>([]);
    const { token } = useSesion();
    const pathname = usePathname();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getSuppliers(token);
                if (response) {
                    setSuppliers(response);
                }
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fetchData();
        }
    }, [token, pathname]);

    return (
        <div className="h-screen text-black bg-gray-100">
            <ContainerDashboard>
                <Title>Proveedores</Title>
                <SuppliersCards suppliers={suppliers} />
                <Link
                    className="flex justify-center w-1/6"
                    href={"/addSupplier"}
                >
                    <Button className="w-full p-2 rounded-xl">
                        Agregar proveedor
                    </Button>
                </Link>
            </ContainerDashboard>
        </div>
    );
};

export default Supplies;
