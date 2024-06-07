"use client";

// Estilos y componentes
import { ContainerDashboard, Title } from "@/components/ui";
import ConsortiumsAdmin from "@/components/ConsortiumAdmin/ConsortiumAdmin";

// Hooks
import useAuth from "@/helpers/useAuth";

// ----------------------

const Consortium = () => {
    useAuth();

    return (
        <div className="h-screen text-black bg-gray-100">
            <ContainerDashboard>
                <Title>Consorcios</Title>
                <ConsortiumsAdmin />
            </ContainerDashboard>
        </div>
    );
};

export default Consortium;
