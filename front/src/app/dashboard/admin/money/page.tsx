"use client";

// Estilos y componentes
import { ContainerDashboard, Title } from "@/components/ui";

// Hooks
import useAuth from "@/helpers/useAuth";

// --------------------

const Money = () => {
    useAuth();

    return (
        <div className="h-screen text-white">
            <ContainerDashboard>
                <Title>Caja</Title>
            </ContainerDashboard>
        </div>
    );
};

export default Money;
