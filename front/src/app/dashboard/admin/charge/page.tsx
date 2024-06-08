"use client";

// Estilos y componentes
import { ContainerDashboard, Title } from "@/components/ui";
import Renter from "@/components/Renter/Renter";

// Hooks
import useAuth from "@/helpers/useAuth";

const Charge = () => {
    useAuth();

    return (
        <div className="h-screen text-white">
            <ContainerDashboard>
                <Title>Cobranzas</Title>
                <Renter />
            </ContainerDashboard>
        </div>
    );
};

export default Charge;
