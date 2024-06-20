"use client";
import { ContainerDashboard, Select, Title } from "../ui";
import Link from "next/link";
import { useEffect, useState } from "react";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import { usePathname, useRouter } from "next/navigation";
import { useUfSesion } from "@/helpers/useUfSesion";
import { getUserById } from "@/helpers/fetch.helper.user";
import { IUser } from "@/Interfaces/user.interfaces";
import {
  IFunctionalUnitExpenses,
  IFunctionalUnits,
} from "@/Interfaces/functionalUnits.interfaces";
import "./userStyles.css";
import { LuMessagesSquare } from "react-icons/lu";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { PiMoneyWavy } from "react-icons/pi";

const DashboardU = () => {
  useAuth();
  const router = useRouter();
  const { token, data } = useSesion();
  const { haveUF, isLoading, functional_unit } = useUfSesion();
  const [uf, setUf] = useState<string>("");
  const path = usePathname();
  const [user, setUser] = useState<IUser>();
  const [functionalUnit, setFunctionalUnit] = useState<IFunctionalUnits[]>([]);
  const [expenses, setExpenses] = useState<IFunctionalUnitExpenses>();

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

  const handleChange = (e: any) => {
    setUf(e.target.value);
  };

  return (
    <div className="h-screen text-white">
      <ContainerDashboard>
        <Title>{user?.first_name + " " + user?.last_name}</Title>
        <div className="flex justify-around w-[95%] h-[70px] gap-5 mt-5">
          <div className="flex items-center w-1/2 border gradUSerr">
            <div className="flex justify-center w-1/2">
              <PiMoneyWavy size={40} />
            </div>
            <div className="flex items-center justify-center w-1/3 gap-2">
              <p className="flex items-center justify-center">Saldo:</p>
              <p>Acá debería traerse lo que debe el usuario</p>
            </div>
          </div>
          <div className="flex items-center w-1/2 border gradUSerr">
            <div className="flex justify-center w-1/3">
              <IoHomeOutline size={40} />
            </div>
            <div className="flex items-center justify-center w-2/3 gap-3">
              <p className="flex items-center justify-center">
                Unidad Funcional:
              </p>
              <p className="flex items-center justify-center">
                {functional_unit.length > 0 ? (
                  <Select name="uf" id="uf" onChange={handleChange}>
                    {functional_unit.map((uf) => (
                      <option key={uf.id} value={uf.id}>
                        {uf.location}
                      </option>
                    ))}
                  </Select>
                ) : (
                  "No hay UF"
                )}
              </p>
            </div>
          </div>
        </div>

        {/* ---------------- */}
        <div className="grid w-full h-auto grid-cols-1 gap-10 px-4 py-10 text-black md:grid-cols-2 lg:grid-cols-3 ">
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
