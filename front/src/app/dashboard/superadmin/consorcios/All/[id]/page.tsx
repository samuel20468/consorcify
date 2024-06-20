"use client";

// Estilos y componentes
import "./consorStyle.css";
import { Button, ContainerDashboard, Title } from "@/components/ui";
import { formatearNumero } from "@/helpers/functions.helper";
import Map from "@/components/Map/Map";
import Swal from "sweetalert2";

// Endpoints
import {
  deleteConsortium,
  getConsortiumById,
} from "@/helpers/fetch.helper.consortium";

// Interfaces
import { IConsortium } from "@/Interfaces/consortium.interfaces";

// Hooks
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import Link from "next/link";

// ---------------------

const Page = () => {
  useAuth();
  const params: { id: string } = useParams();
  const { token } = useSesion();
  const router = useRouter();
  const [consorcio, setConsorcio] = useState<IConsortium>();
  const [cuit, setCuit] = useState<string>("");

  useEffect(() => {
    const fetchData = async (token: string) => {
      const response = await getConsortiumById(params.id, token);
      const data = await response?.json();
      setConsorcio(data);
    };
    try {
    } catch (error) {
      console.error(error);
    }
    if (token) {
      fetchData(token);
    }
  }, [token, params.id]);

  useEffect(() => {
    if (consorcio) {
      const formatedCuit = formatearNumero(consorcio?.cuit!);
      setCuit(formatedCuit);
    }
  }, [consorcio]);

  const handleDelete = async () => {
    Swal.fire({
      icon: "warning",
      title: "Estás seguro?",
      text: `Te recuerdo que si borras el consorcio ${consorcio?.name} no podrás volver atrás.`,
      showCancelButton: true,
      confirmButtonColor: "#609e87",
      cancelButtonColor: "#c36961",
      confirmButtonText: "Si, borrarlo!",
      cancelButtonText: "No, cancelar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteConsortium(params.id, token);
          Swal.fire({
            title: "Consorcio borrado!",
            text: `El consorcio ${consorcio?.name} fue borrado correctamente`,
            icon: "success",
          });
          router.push("/dashboard/superadmin/consorcios/All");
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  return (
    <div className="h-screen">
      <ContainerDashboard>
        <Title>
          Consorcios{" "}
          <span className="text-2xl font-thin">| Todos los consorcios </span>
          <span className="text-xl font-thin">| {consorcio?.name}</span>
        </Title>
        <div className="flex flex-col items-center gap-4 p-4 mt-5 border gradienteCon">
          <div className="flex w-full h-3/5">
            <div className="w-1/3">
              <img
                className="h-full rounded-[40px]"
                src={consorcio?.picture}
                alt={consorcio?.name}
              />
            </div>
            <div className="flex flex-col justify-center w-2/3 py-2">
              <div className="mb-5 text-center">
                <h1 className="text-4xl font-bold">{consorcio?.name}</h1>
              </div>
              <div className="flex flex-col gap-2 px-2 text-center">
                <div>
                  <h1 className="text-xl font-extralight">
                    <span className="font-bold">CUIT:</span>{" "}
                    {formatearNumero(consorcio?.cuit!)}
                  </h1>
                </div>
                <div>
                  <h1 className="text-xl font-extralight">
                    <span className="font-bold">Dirección:</span>{" "}
                    {consorcio?.street_name} {consorcio?.building_number} (
                    {consorcio?.city}, {consorcio?.province},{" "}
                    {consorcio?.country})
                  </h1>
                </div>
                <div>
                  <h1 className="text-xl font-extralight">
                    <span className="font-bold">Administrador:</span>{" "}
                    {consorcio?.c_admin.name}
                  </h1>
                </div>
                <div className="flex justify-evenly">
                  <h1 className="text-xl font-extralight">
                    <span className="font-bold">Categoría del edificio:</span>{" "}
                    {consorcio?.category}
                  </h1>
                  <h1 className="text-xl font-extralight">
                    <span className="font-bold">Clave SUTERH:</span>{" "}
                    {consorcio?.suterh_key}
                  </h1>
                </div>
                <div className="flex justify-evenly">
                  <h1 className="text-xl font-extralight">
                    <span className="font-bold">Cantidad de pisos:</span>
                    {"  "}
                    {consorcio?.floors}
                  </h1>
                  <h1 className="text-xl font-extralight">
                    <span className="font-bold">Unidades funcionales:</span>{" "}
                    {consorcio?.ufs}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-2/5">
            {consorcio && (
              <Map lat={consorcio.latitude} lng={consorcio.longitude} />
            )}
          </div>
        </div>

        <div className="flex justify-center w-[70%] mt-5 mb-10 gap-4">
          <Link href={`/updateConsortium/${consorcio?.id}`}>
            <Button className="w-44 py-2 rounded-[40px]">
              Modificar Consorcio
            </Button>
          </Link>
          <Button className="w-44 py-2 rounded-[40px]" onClick={handleDelete}>
            Desactivar Consorcio
          </Button>
        </div>
      </ContainerDashboard>
    </div>
  );
};

export default Page;
