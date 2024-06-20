"use client";

// Estilos y componentes
import { Button, ContainerDashboard, Title } from "@/components/ui";
import { formatMoney, formatearNumero } from "@/helpers/functions.helper";
import Swal from "sweetalert2";
import Map from "@/components/Map/Map";

// Endpoints
import {
  deleteSupplier,
  getSupplierById,
} from "@/helpers/fetch.helper.supplier";

// Interfaces
import { ISupplier } from "@/Interfaces/suppliers.interfaces";

// Hooks
import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";

// -------------------

const Supplier = () => {
  useAuth();
  const { token } = useSesion();
  const params: { id: string } = useParams();
  const [suppliers, setSuppliers] = useState<ISupplier>();
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await getSupplierById(token, params.id);
        if (response) {
          const data = await response.json();
          setSuppliers(data);
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
      title: "Eliminar proveedor",
      text: "¿Está seguro que desea eliminar el proveedor?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#c36961",
      confirmButtonColor: "#609e87",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteSupplier(suppliers?.id!, token);
          if (response) {
            Swal.fire({
              icon: "success",
              title: "Proveedor eliminado",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#609e87",
            });
            router.push("/dashboard/admin/portal/suppliers");
          } else {
            Swal.fire({
              icon: "error",
              title: "No se ha podido eliminar el proveedor",
              text: "Intentelo más tarde",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#609e87",
            });
          }
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
          Portal{" "}
          <span className="text-2xl font-thin">
            | Proveedores |{" "}
            <span className="text-xl font-thin">{suppliers?.name}</span>
          </span>
        </Title>
        <div className="flex p-4 mt-5 border w-[950px] h-[500px] rounded-[50px]">
          <div className="w-1/3">
            {suppliers && (
              <Map lat={suppliers.latitude} lng={suppliers.longitude} />
            )}
          </div>
          <div className="flex flex-col justify-around items-center w-2/3">
            <div className="w-[80%] px-5 pb-3 border-b text-center">
              <h1 className="text-4xl font-bold">{suppliers?.name}</h1>
            </div>
            <div>
              <h1 className="text-2xl font-extralight">
                CUIT:{" "}
                <span className="font-bold">
                  {formatearNumero(suppliers?.cuit)}
                </span>
              </h1>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl text-center">Dirección:</h1>
              <h1 className="text-2xl font-extralight">{suppliers?.address}</h1>
            </div>
            <div className="flex justify-evenly w-full">
              <div className="flex flex-col">
                <h1 className="text-xl text-center">Email:</h1>
                <h1 className="text-2xl font-extralight">{suppliers?.email}</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl text-center">Teléfono:</h1>{" "}
                <h1 className="text-2xl font-extralight">
                  {suppliers?.phone_number}
                </h1>
              </div>
            </div>
            <div>
              {suppliers &&
                (suppliers?.balance > 0 ? (
                  <h1 className="text-2xl font-extralight">
                    Saldo:{" "}
                    <span className="font-bold text-redd">
                      {formatMoney(suppliers?.balance)}
                    </span>
                  </h1>
                ) : (
                  <h1 className="text-2xl font-extralight">
                    Saldo:{" "}
                    <span className="font-bold">
                      {formatMoney(suppliers?.balance)}
                    </span>
                  </h1>
                ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center w-[70%] my-5 gap-8">
          <Button className="w-44 py-2 rounded-[40px]" onClick={handleDelete}>
            Eliminar Proveedor
          </Button>
        </div>
      </ContainerDashboard>
    </div>
  );
};

export default Supplier;
