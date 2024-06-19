"use client";
import { IUser } from "@/Interfaces/user.interfaces";
import { ContainerDashboard, Title } from "@/components/ui";
import { getUserById } from "@/helpers/fetch.helper.user";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import { useUfSesion } from "@/helpers/useUfSesion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Consortium = () => {
  useAuth();
  const { token, data } = useSesion();
  const { haveUF, isLoading, functional_unit } = useUfSesion();
  const [user, setUser] = useState<IUser>();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(data?.id, token);
        if (response.ok) {
          const user = await response.json();
          setUser(user);
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
        <Title>Consorcio</Title>
      </ContainerDashboard>
    </div>
  );
};
export default Consortium;
