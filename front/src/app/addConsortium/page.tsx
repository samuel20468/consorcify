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
    <div className="h-screen">
      <ContainerDashboard>
        <Title>
          Consorcios{" "}
          <span className="text-2xl font-thin">| Crear Consorcio</span>
        </Title>
        <div className="w-[80%] my-5">
          <FormRegisterConsortium />
        </div>
      </ContainerDashboard>
    </div>
  );
};

export default AddConsortium;
