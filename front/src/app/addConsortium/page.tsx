"use client";

// Estilos y componentes
import { ContainerDashboard, Title } from "@/components/ui";
import FormRegisterConsortium from "@/components/FormRegisterConsortium/FormRegisterConsortium";

// Hooks
import useAuth from "@/helpers/useAuth";

// -----------------------

const AddConsortium = () => {
    useAuth();

    return (
        <div className="flex flex-col h-screen">
            <ContainerDashboard>
                <Title>
                    Consorcios{" "}
                    <span className="text-2xl font-thin">
                        | Crear consorcio
                    </span>
                </Title>
                <div className="flex items-center justify-center my-10 bg-[#d3d3d3] rounded-lg h-content">
                    <FormRegisterConsortium />
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default AddConsortium;
