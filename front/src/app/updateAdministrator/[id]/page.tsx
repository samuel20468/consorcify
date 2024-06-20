"use client";

// Estilos y componentes
import { ContainerDashboard, Title } from "@/components/ui";
import FormRegisterAdmin from "@/components/FormRegisterAdministrador/FormRegisterAdmin";

// Hooks
import useAuth from "@/helpers/useAuth";

const AddConsortium = () => {
  useAuth();

  return (
    <div className="h-screen">
      <ContainerDashboard>
        <Title>
          Modificar administrador{" "}
          <span className="text-xl font-thin">| Modificar administrador</span>
        </Title>
        <div className="w-[80%] my-5">
          <FormRegisterAdmin update={true} />
        </div>
      </ContainerDashboard>
    </div>
  );
};

export default AddConsortium;
