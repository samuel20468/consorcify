"use client";

// Estilos y componentes
import "./adminStyle.css";
import { Button, ContainerDashboard, Title } from "@/components/ui";
import { formatearNumero } from "@/helpers/functions.helper";
import Swal from "sweetalert2";

// Interfaces
import { IAdmin } from "@/Interfaces/admin.interfaces";

// Endpoints
import { deleteAdmin, getAdminById } from "@/helpers/fetch.helper.admin";

// Hooks
import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import Link from "next/link";

// -----------------------

const Page = () => {
  useAuth();
  const router = useRouter();
  const params: { id: string } = useParams();
  const { token } = useSesion();
  const [admin, setAdmin] = useState<IAdmin>();
  const path = usePathname();
  const restrictedEmail = "sin_administrador_asignado@consorcify.com";

  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await getAdminById(params.id, token);
        if (response) {
          const data = await response.json();
          setAdmin(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
      fecthData();
    }
  }, [path, token, params.id]);

  const handleDelete = async () => {
    Swal.fire({
      icon: "warning",
      title: "Estás seguro?",
      text: `Te recuerdo que si borras la administración ${admin?.name} no podrás volver atrás.`,
      showCancelButton: true,
      confirmButtonColor: "#609e87",
      cancelButtonColor: "#c36961",
      confirmButtonText: "Si, borrarlo!",
      cancelButtonText: "No, cancelar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteAdmin(params.id, token);
          Swal.fire({
            title: "Administración borrada!",
            text: `La administración ${admin?.name} fue borrada correctamente`,
            icon: "success",
          });
          router.push("/dashboard/superadmin/administracion/All");
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
          Administración{" "}
          <span className="text-2xl font-thin">
            | Administraciones{" "}
            <span className="text-xl font-thin">| {admin?.name}</span>
          </span>
        </Title>
        <div className="flex flex-col items-center justify-center gap-4 p-4 mt-5 border gradienteAdm">
          <div className="flex items-center w-full h-3/5">
            <div className="w-1/3">
              <img
                src={admin?.picture}
                alt={admin?.name}
                className="h-full rounded-[40px] shadow-xl shadow-blackk"
              />
            </div>
            <div className="flex flex-col w-3/4 gap-2">
              <div className="mb-5 text-center">
                <h1 className="text-4xl font-bold">{admin?.name}</h1>
              </div>
              <div className="flex flex-col gap-2 px-2 text-center">
                <div>
                  <p className="text-xl font-extralight">
                    <span className="font-bold">CUIT:</span>{" "}
                    {formatearNumero(admin?.cuit!)}
                  </p>
                </div>
                <div>
                  <p className="text-xl font-extralight">
                    <span className="font-bold">Dirección:</span>{" "}
                    {admin?.address}
                  </p>
                </div>
                <div className="flex justify-evenly">
                  <p className="text-xl font-extralight">
                    <span className="font-bold">EMAIL:</span> {admin?.email}
                  </p>
                  <p className="text-xl font-extralight">
                    <span className="font-bold">TELÉFONO: </span>
                    {admin?.phone_number}
                  </p>
                </div>
                <div className="flex justify-evenly">
                  <p className="text-xl font-extralight">
                    <span className="font-bold">SITUACIÓN TRIBUTARIA:</span>{" "}
                    {admin?.sat}
                  </p>
                  <p className="text-xl font-extralight">
                    <span className="font-bold">MATRÍCULA RPA: </span>
                    {admin?.rpa}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {admin && admin?.email !== restrictedEmail && (
          <div className="flex justify-center w-[70%] mt-5 mb-10 gap-4">
            <Link href={`/updateAdministrator/${admin?.id}`}>
              <Button className="w-44 py-2 rounded-[40px]">
                Modificar Administrador
              </Button>
            </Link>

            <Button onClick={handleDelete} className="w-44 py-2 rounded-[40px]">
              Eliminar
            </Button>
          </div>
        )}
      </ContainerDashboard>
    </div>
  );
};

export default Page;
