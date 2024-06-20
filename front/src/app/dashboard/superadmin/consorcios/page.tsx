"use client";

// Estilos y componentes
import { ContainerDashboard, Title } from "@/components/ui";
import { BsFillBuildingsFill } from "react-icons/bs";
import { BsBuildingFillAdd } from "react-icons/bs";

// Hooks
import useAuth from "@/helpers/useAuth";
import Link from "next/link";

const ConsorciosCrud = () => {
  useAuth();
  return (
    <div className="h-screen">
      <ContainerDashboard>
        <Title>Consorcios</Title>
        <div className="flex justify-center w-[98%] gap-10 p-4 pt-[10%]">
          <Link
            href="/addConsortium"
            className="flex flex-col items-center justify-center text-3xl text-white border rounded-[40px] pb-2 gradiente shadow-[0_3px_10px_rgb(255,255,255,0.8)]"
          >
            <BsBuildingFillAdd size={100} />
            <h3 className="mt-4 mb-1 text-3xl font-bold">Crear consorcio</h3>
          </Link>
          <Link
            href="/dashboard/superadmin/consorcios/All"
            className="flex flex-col items-center justify-center text-3xl text-white border rounded-[40px] pb-2 gradiente shadow-[0_3px_10px_rgb(255,255,255,0.8)]"
          >
            <BsFillBuildingsFill size={100} />
            <h3 className="mt-4 mb-1 text-3xl font-bold">Ver consorcios</h3>
          </Link>
        </div>
      </ContainerDashboard>
    </div>
  );
};

export default ConsorciosCrud;
