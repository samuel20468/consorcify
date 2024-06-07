"use client";

// Estilos y componentes
import FormSpent from "@/components/FormSpent/FormSpent";
import { ContainerDashboard, Title } from "@/components/ui";

// Hooks
import useAuth from "@/helpers/useAuth";

// ------------------

const AddSpent = () => {
    useAuth();

    return (
        <div className="h-screen text-black bg-gray-100">
            <ContainerDashboard>
                <Title>Nuevo Gasto</Title>
                <FormSpent />
            </ContainerDashboard>
        </div>
    );
};

export default AddSpent;
