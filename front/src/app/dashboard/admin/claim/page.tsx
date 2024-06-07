"use client";

// Estilos y componentes
import { ContainerDashboard, Title } from "@/components/ui";

// Hooks
import useAuth from "@/helpers/useAuth";

// --------------------

const Claim = () => {
    useAuth();

    return (
        <div className="h-screen text-black bg-gray-100">
            <ContainerDashboard>
                <Title>Raclamos </Title>
            </ContainerDashboard>
        </div>
    );
};

export default Claim;
