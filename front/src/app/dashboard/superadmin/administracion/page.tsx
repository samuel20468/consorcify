"use client";

// Estilos y componentes
import { ContainerDashboard, Title } from "@/components/ui";
import { FaUsers } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";

// Hooks
import useAuth from "@/helpers/useAuth";
import Link from "next/link";

// ---------------

const ConsorciosCrud = () => {
  useAuth();

  return (
    <div className="h-screen">
      <ContainerDashboard>
        <Title>Administración</Title>
        <div className="flex justify-center w-[98%] gap-10 p-4">
          <Link
            href="/addAdministrator"
            className="flex flex-col items-center justify-center text-3xl text-white border rounded-[40px] pb-2 gradiente shadow-[0_3px_10px_rgb(255,255,255,0.8)]"
          >
            <IoMdPersonAdd size={100} />
            <h3 className="mt-4 mb-1 text-3xl font-bold">
              Crear administrador
            </h3>
          </Link>
          <Link
            href="/dashboard/superadmin/administracion/All"
            className="flex flex-col items-center justify-center text-3xl text-white border rounded-[40px] pb-2 gradiente shadow-[0_3px_10px_rgb(255,255,255,0.8)]"
          >
            <FaUsers size={100} />
            <h3 className="mt-4 mb-1 text-3xl font-bold">
              Ver Administradores
            </h3>
          </Link>
        </div>
      </ContainerDashboard>
    </div>
  );
};

export default ConsorciosCrud;
