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
        <div className="flex flex-col h-auto text-black bg-[#e5e7eb]">
            <ContainerDashboard>
                <Title>Crear administración</Title>
                <div className="flex items-center justify-center w-1/2 my-10 rounded-lg h-content bg-slate-200">
                    <FormRegisterAdmin />
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default AddConsortium;
