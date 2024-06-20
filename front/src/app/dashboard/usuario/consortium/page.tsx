"use client";

// Estilos y componentes
import "./consortiumstyle.css";
import { ContainerDashboard, Title } from "@/components/ui";
import { formatearNumero } from "@/helpers/functions.helper";
import Map from "@/components/Map/Map";
import Swal from "sweetalert2";

// Endpoints
import { getUserById } from "@/helpers/fetch.helper.user";
import { useUfSesion } from "@/helpers/useUfSesion";

// Interfaces
import { IConsortium } from "@/Interfaces/consortium.interfaces";
import { IUser } from "@/Interfaces/user.interfaces";

// Hooks
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";

// -------------------------

const Consortium = () => {
  useAuth();
  const { token, data } = useSesion();
  const { haveUF, isLoading, functional_unit } = useUfSesion();
  const [consortium, setConsortium] = useState<IConsortium>();
  const [user, setUser] = useState<IUser>();
  const router = useRouter();
  console.log(consortium);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(data?.id, token);
        if (response.ok) {
          const user = await response.json();
          setUser(user);
          setConsortium(user?.functional_units?.[0].consortium);
        } else {
          Swal.fire({
            title: "Error",
            text: "No se pudo cargar el usuario",
            icon: "error",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      } catch (error) {
        console.log("Error al cargar el usuario", error);
        Swal.fire({
          title: "Error",
          text: (error as Error).message,
          icon: "error",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    };
    if (token && data?.id) {
      fetchUser();
    }
  }, [token]);

  useEffect(() => {
    if (!isLoading && !haveUF) {
      router.push("/dashboard/usuario/addfuncionalunit");
    }
  }, [isLoading, haveUF, router]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="h-screen">
      <ContainerDashboard>
        <Title>
          Consorcios{" "}
          <span className="text-2xl font-thin">| {consortium?.name}</span>
        </Title>
        <div className="flex flex-col items-center gap-4 p-4 my-5 border graduser">
          <div className="flex w-full h-3/5">
            <div className="w-1/3">
              <img
                className="h-full rounded-[40px]"
                src={consortium?.picture}
                alt={consortium?.name}
              />
            </div>
            <div className="flex flex-col justify-center w-2/3 py-2">
              <div className="mb-5 text-center">
                <h1 className="text-4xl font-bold">{consortium?.name}</h1>
              </div>
              <div className="flex flex-col gap-2 px-2 text-center">
                <div>
                  <h1 className="text-xl font-extralight">
                    <span className="font-bold">CUIT:</span>{" "}
                    {formatearNumero(consortium?.cuit!)}
                  </h1>
                </div>
                <div>
                  <h1 className="text-xl font-extralight">
                    <span className="font-bold">Dirección:</span>{" "}
                    {consortium?.street_name} {consortium?.building_number} (
                    {consortium?.city}, {consortium?.province},{" "}
                    {consortium?.country})
                  </h1>
                </div>
                <div>
                  <h1 className="text-xl font-extralight">
                    <span className="font-bold">Administrador:</span>{" "}
                  </h1>
                </div>
                <div className="flex justify-evenly">
                  <h1 className="text-xl font-extralight">
                    <span className="font-bold">Categoría del edificio:</span>{" "}
                    {consortium?.category}
                  </h1>
                  <h1 className="text-xl font-extralight">
                    <span className="font-bold">Clave SUTERH:</span>{" "}
                    {consortium?.suterh_key}
                  </h1>
                </div>
                <div className="flex justify-evenly">
                  <h1 className="text-xl font-extralight">
                    <span className="font-bold">Cantidad de pisos:</span>
                    {"  "}
                    {consortium?.floors}
                  </h1>
                  <h1 className="text-xl font-extralight">
                    <span className="font-bold">Unidades funcionales:</span>{" "}
                    {consortium?.ufs}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-2/5">
            {consortium && (
              <Map lat={consortium.latitude} lng={consortium.longitude} />
            )}
          </div>
        </div>
      </ContainerDashboard>
    </div>
  );
};
export default Consortium;
