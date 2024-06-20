"use client";

// Estilos y componentes
import FormSpent from "@/components/FormSpent/FormSpent";
import { ContainerDashboard, Title } from "@/components/ui";

// Hooks
import useAuth from "@/helpers/useAuth";

// ------------------

const AddSpent = () => {
  useAuth();

  return (
    <div className="h-screen">
      <ContainerDashboard>
        <Title>
          Gastos <span className="text-2xl font-thin">| Nuevo Gasto</span>
        </Title>
        <div className="w-[80%] mt-5">
          <FormSpent />
        </div>
      </ContainerDashboard>
    </div>
  );
};

export default AddSpent;
