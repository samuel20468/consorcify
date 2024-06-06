"use client";

// Estilos y componentes
import { ContainerDashboard, Title } from "@/components/ui";
import FormSupplier from "@/components/FormSupplier/FormSupplier";

// Hooks
import useAuth from "@/helpers/useAuth";

// ------------------

const AddSupplier = () => {
    useAuth();

    return (
        <div className="h-screen text-black bg-gray-100">
            <ContainerDashboard>
                <Title>Nuevo Proveedor</Title>
                <FormSupplier />
            </ContainerDashboard>
        </div>
    );
};

export default AddSupplier;
