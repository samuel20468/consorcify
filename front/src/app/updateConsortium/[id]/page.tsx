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
          <span className="text-xl font-thin">| Modificar Consorcio</span>
        </Title>
        <div className="w-[80%] my-5">
          <FormRegisterConsortium update={true} />
        </div>
      </ContainerDashboard>
    </div>
  );
};

export default AddConsortium;
