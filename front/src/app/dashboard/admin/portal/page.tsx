"use client";

// Estilos y componentes
import { ContainerDashboard, Title } from "@/components/ui";
import SectionPortal from "@/components/SectionPortal/SectionPortal";

// Hooks
import useAuth from "@/helpers/useAuth";

// -----------------

const Portal = () => {
    useAuth();

    return (
        <div className="h-screen text-white">
            <ContainerDashboard>
                <Title>Portal</Title>
                <SectionPortal />
            </ContainerDashboard>
        </div>
    );
};

export default Portal;
