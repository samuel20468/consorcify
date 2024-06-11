"use client";

// Estilos y componentes
import FormRegisterAdmin from "@/components/FormRegisterAdministrador/FormRegisterAdmin";
import { ContainerDashboard, Title } from "@/components/ui";

// Hooks
import useAuth from "@/helpers/useAuth";

// -------------

const AddConsortium = () => {
    useAuth();

    return (
        <div className="flex flex-col h-screen text-white">
            <ContainerDashboard>
                <Title>
                    Administración{" "}
                    <span className="text-2xl font-thin">
                        | Crear administración
                    </span>
                </Title>
                <div className="flex items-center justify-center w-1/2 my-10 rounded-lg h-content bg-[#d3d3d3]">
                    <FormRegisterAdmin />
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default AddConsortium;
