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
    <div className="h-screen">
      <ContainerDashboard>
        <Title>
          Administración{" "}
          <span className="text-2xl font-thin">| Crear administración</span>
        </Title>
        <div className="w-[60%] my-5">
          <FormRegisterAdmin />
        </div>
      </ContainerDashboard>
    </div>
  );
};

export default AddConsortium;
