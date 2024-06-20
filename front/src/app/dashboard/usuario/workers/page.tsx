"use client";

// Estilos y componentes
import { ContainerDashboard, Title } from "@/components/ui";
import SuppliersCards from "@/components/SuppliersCards/SuppliersCards";
import Swal from "sweetalert2";

// Endpoints
import { getSuppliersByConsortiumId } from "@/helpers/fetch.helper.supplier";
import { useUfSesion } from "@/helpers/useUfSesion";

// Interfaces
import { ISupplier } from "@/Interfaces/suppliers.interfaces";

// Hooks
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";

// ----------------------------------------------------------------------

const Workers = () => {
  useAuth();
  const path = usePathname();
  const { token, data } = useSesion();
  const { haveUF, isLoading, functional_unit } = useUfSesion();
  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
  const [id, setId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (functional_unit) {
      setId(functional_unit?.[0]?.consortium?.id);
    }
  }, [functional_unit]);

  useEffect(() => {
    const getSuppliers = async () => {
      try {
        const response = await getSuppliersByConsortiumId(id, token);
        if (response) {
          const suppliers = await response.json();
          setSuppliers(suppliers);
        } else {
          console.log("No se encontraron proveedores");
          Swal.fire({
            title: "Error al obtener proveedores",
            text: "Por favor, inténtelo de nuevo más tarde",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error al obtener proveedores",
          text: (error as Error).message,
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    };
    if (token && id) {
      getSuppliers();
    }
  }, [token, path, id]);

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
        <Title>Proveedores</Title>
        <div className="w-[90%] border-t border-b border-white flex justify-between p-2 mt-5 text-center">
          <h1 className="w-1/5 text-xl">Nombre</h1>
          <h1 className="w-1/5 text-xl">Cuit</h1>
          <h1 className="w-1/5 text-xl">E-mail</h1>
          <h1 className="w-1/5 text-xl">Teléfono</h1>
          <h1 className="w-1/5 text-xl">Dirección</h1>
        </div>
        {suppliers.length > 0 ? (
          <SuppliersCards suppliers={suppliers} roles={data?.roles} />
        ) : (
          <div className="p-8">
            <h1 className="text-2xl">Aún no hay proveedores registrados</h1>
          </div>
        )}
      </ContainerDashboard>
    </div>
  );
};
export default Workers;
