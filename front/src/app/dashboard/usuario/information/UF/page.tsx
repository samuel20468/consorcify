"use client";

// Estilos y componentes
import "./ufStyles.css";
import { Button, ContainerDashboard, Select, Title } from "@/components/ui";
import Swal from "sweetalert2";

// Endpoints
import { getUserById } from "@/helpers/fetch.helper.user";
import { useUfSesion } from "@/helpers/useUfSesion";

// Interfaces
import { IFunctionalUnits } from "@/Interfaces/functionalUnits.interfaces";
import { IUser } from "@/Interfaces/user.interfaces";

// Hooks
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import Link from "next/link";

// -------------------------

const UnidadFuncional = () => {
  useAuth();
  const { token, data } = useSesion();
  const { haveUF, isLoading, functional_unit } = useUfSesion();
  const [user, setUser] = useState<IUser>();
  const [functional_units, setFunctionalUnits] = useState<IFunctionalUnits[]>();
  const router = useRouter();
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (!isLoading && !haveUF) {
      router.push("/dashboard/usuario/addfuncionalunit");
    }
  }, [isLoading, haveUF, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserById(data?.id, token);
        if (response?.ok) {
          const datos = await response.json();
          setUser(datos);
          setFunctionalUnits(datos?.functional_units);
        } else {
          Swal.fire({
            title: "Error",
            text: "No se pudo obtener los datos del usuario",
            icon: "error",
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      setFunctionalUnits(user?.functional_units);
    }
  }, [user]);

  const handleSelect = (e: any) => {
    const index = e.target.value;
    setIndex(index);
  };
  return (
    <div className="h-screen">
      <ContainerDashboard>
        <Title>Unidad funcional</Title>
        <div className="flex items-center justify-between w-[98%]">
          <div className="flex justify-start w-2/3 gap-3">
            <Select
              onChange={handleSelect}
              className="w-1/3 h-10 px-2 my-1 text-gray-200 rounded-md shadow-xl cursor-pointer bg-input focus:outline-none no-spinners"
            >
              <option value="" disabled>
                Selecciona la unidad funcional
              </option>
              {functional_units?.map((uf, index) => (
                <option key={uf.id} value={index}>
                  {uf.location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex w-1/3">
            <Link
              href="/dashboard/usuario/addfuncionalunit"
              className="flex justify-end w-full mr-5"
            >
              <Button className="w-1/2 p-2 rounded-[40px]">
                Agregar unidad Funcional
              </Button>
            </Link>
          </div>
        </div>
        {user?.functional_units?.length! > 0 && (
          <div className="flex flex-col items-center justify-center gap-4 p-4 mt-5 border gradienteUF">
            <div className="flex flex-col w-3/4 gap-2">
              <div className="flex justify-center mb-4">
                <p className="text-4xl">Datos de la unidad funcional</p>
              </div>
              <div className="flex flex-col gap-4 px-2 text-center">
                <div>
                  <p className="text-2xl font-extralight">
                    <span className="font-bold">Tipo: </span>
                    {user?.functional_units?.[index].type}
                  </p>
                </div>

                <div className="flex justify-evenly">
                  <p className="text-xl font-extralight">
                    <span className="font-bold">Locación: </span>
                    {user?.functional_units?.[index].location}
                  </p>
                  <p className="text-xl font-extralight">
                    <span className="font-bold">Número: </span>{" "}
                    {user?.functional_units?.[index].number}
                  </p>
                </div>
                <div>
                  <p className="text-xl font-extralight">
                    <span className="font-bold">Propietario:</span>{" "}
                    {user?.functional_units?.[index].owner}
                  </p>
                </div>

                <div>
                  <p className="text-xl font-extralight">
                    <span className="font-bold">Teléfono del propietario:</span>{" "}
                    {user?.functional_units?.[index].owner_phone_number}
                  </p>
                </div>

                <div>
                  <p className="text-xl font-extralight">
                    <span className="font-bold">Email:</span>{" "}
                    {user?.functional_units?.[index].owner_email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </ContainerDashboard>
    </div>
  );
};
export default UnidadFuncional;
