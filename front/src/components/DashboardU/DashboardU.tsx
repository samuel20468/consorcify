"use client";

// Estilos y componentes
import "./userStyles.css";
import { ContainerDashboard, Title } from "../ui";
import { LuMessagesSquare } from "react-icons/lu";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { MdOutlineMapsHomeWork } from "react-icons/md";

// Endpoints
import { useUfSesion } from "@/helpers/useUfSesion";
import { getUserById } from "@/helpers/fetch.helper.user";

// Interfaces
import { IFunctionalUnits } from "@/Interfaces/functionalUnits.interfaces";
import { IUser } from "@/Interfaces/user.interfaces";

// Hooks
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import Link from "next/link";

// ----------------

const DashboardU = () => {
  useAuth();
  const router = useRouter();
  const { token, data } = useSesion();
  const { haveUF, isLoading, functional_unit } = useUfSesion();
  const path = usePathname();
  const [user, setUser] = useState<IUser>();
  const [functionalUnit, setFunctionalUnit] = useState<IFunctionalUnits[]>([]);

  useEffect(() => {
    const fecthUser = async () => {
      try {
        const response = await getUserById(data.id, token);

        if (response?.ok) {
          const datos = await response.json();
          setUser(datos);
          setFunctionalUnit(datos?.functional_units);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
      fecthUser();
    }
  }, [token, path]);

  useEffect(() => {
    if (!isLoading && !haveUF) {
      router.push("/dashboard/usuario/addfuncionalunit");
    }
  }, [isLoading, haveUF, router]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="h-screen text-white">
      <ContainerDashboard>
        <Title>{user?.first_name + " " + user?.last_name}</Title>
        {/* ---------------- */}
        <div className="grid w-full h-auto grid-cols-1 gap-10 px-4 pb-10 text-black md:grid-cols-2 lg:grid-cols-3 mt-5">
          <Link
            href="/dashboard/usuario/expenses"
            className="flex flex-col items-center justify-center text-3xl text-white border rounded-[40px] pb-2 gradiente shadow-[0_3px_10px_rgb(255,255,255,0.8)]"
          >
            <HiOutlineClipboardDocumentCheck size={100} />
            <h3 className="mt-4 mb-1 text-2xl font-bold">Pagar expensa </h3>
            <p className="w-2/3 text-base text-center ">
              Pagar tus expensas nunca fue tan fácil. Ahora es a un click de
              distancia.
            </p>
          </Link>
          <Link
            href="/dashboard/usuario/information/UF"
            className="flex flex-col items-center justify-center text-3xl text-white border rounded-[40px] pb-2 gradiente shadow-[0_3px_10px_rgb(255,255,255,0.8)]"
          >
            <MdOutlineMapsHomeWork size={100} />
            <h3 className="mt-4 mb-1 text-2xl font-bold">
              Ver unidades funcionales
            </h3>
            <p className="w-2/3 text-base text-center ">
              Puedes ver en detalle tus unidades funcionales y agregar nuevas.
            </p>
          </Link>
          <Link
            href="/newmessage"
            className="flex flex-col items-center justify-center text-3xl text-white border rounded-[40px] pb-2 gradiente shadow-[0_3px_10px_rgb(255,255,255,0.8)]"
          >
            <LuMessagesSquare size={100} />
            <h3 className="mt-4 mb-1 text-2xl font-bold">Iniciar un reclamo</h3>
            <p className="w-2/3 text-base text-center ">
              Hazle llegar cualquier reclamo a la administración de tu
              consorcio.
            </p>
          </Link>
        </div>
        <div className="w-full h-auto gap-10 p-4 mb-4 text-white md:grid-cols-2">
          <div className="flex items-center justify-center h-24 border-t">
            <h1 className="text-2xl font-thin">
              Trabajar con nosotros fomenta una comunidad unida y organizada.
            </h1>
          </div>
        </div>
      </ContainerDashboard>
    </div>
  );
};

export default DashboardU;
