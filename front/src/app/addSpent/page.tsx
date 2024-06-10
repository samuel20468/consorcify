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
        <div className="h-screen text-white">
            <ContainerDashboard>
                <Title>
                    Gastos{" "}
                    <span className="text-2xl font-thin">| Nuevo gasto</span>
                </Title>
                <FormSpent />
            </ContainerDashboard>
        </div>
    );
};

export default AddSpent;
