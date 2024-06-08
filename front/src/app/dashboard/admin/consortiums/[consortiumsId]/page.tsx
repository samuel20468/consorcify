"use client";

// Estilos y contenedores
import { ContainerDashboard } from "@/components/ui";

// Hooks
import { useParams } from "next/navigation";
import useAuth from "@/helpers/useAuth";

// --------------------

const ConsortiumId = () => {
    const { consortiumsId } = useParams();
    useAuth();

    return (
        <div className="h-screen text-white">
            <ContainerDashboard>
                <h1>aca van los detalles del consorcio: {consortiumsId}</h1>
            </ContainerDashboard>
        </div>
    );
};

export default ConsortiumId;
