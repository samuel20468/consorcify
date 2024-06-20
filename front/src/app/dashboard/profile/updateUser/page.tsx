"use client";

// Estilos y componentes
import {
  Button,
  ContainerDashboard,
  Input,
  Label,
  Title,
} from "@/components/ui";

// Endpoints
import { getUserById, updateUser } from "@/helpers/fetch.helper.user";

// Interfaces
import { IRegister, IRegisterError } from "@/Interfaces/user.interfaces";

// Hooks
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import { areFieldsNotEmpty } from "@/helpers/Validations/validate.empty";
import Swal from "sweetalert2";

// -------------------------

const UpdateUser = () => {
  useAuth();
  const { token, data } = useSesion();
  const path = usePathname();
  const router = useRouter();

  const initialData = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };
  const [userData, setUserData] = useState<IRegister>(initialData);
  const [errors, setErrors] = useState<IRegisterError>(initialData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserById(data.id, token);
        if (response?.ok) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [token, path, data.id]);
  console.log(userData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!areFieldsNotEmpty(userData)) {
      Swal.fire({
        title: "Error",
        text: "Por favor, complete todos los campos.",
        icon: "error",
        showCancelButton: false,
        confirmButtonText: "Ok",
      });
    }

    try {
      const response = await updateUser(userData, data.id, token);
      if (response?.ok) {
        Swal.fire({
          title: "Cambios guardados",
          text: "Tu perfil ha sido actualizado correctamente",
          icon: "success",
          confirmButtonColor: "#0b0c0d",
        }).then((res) => {
          if (res.isConfirmed) {
            router.push("/dashboard/profile");
          }
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error al actualizar tu perfil",
          icon: "error",
          confirmButtonColor: "#0b0c0d",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUserData(initialData);
    setErrors(initialData);
    router.push("/dashboard/profile");
  };

  return (
    <div className="h-screen">
      <ContainerDashboard>
        <Title>
          {userData?.first_name + " " + userData?.last_name}{" "}
          <span className="text-2xl font-thin">| Modificar datos</span>
        </Title>
        <div className="w-[50%] mt-5">
          <div className="w-full h-auto p-4 text-white border rounded-[40px]">
            <div className="my-2 text-center">
              <h1 className="mb-2 text-2xl font-bold">Modificar usuario</h1>
            </div>
            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              className="mx-10 my-5"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <Label htmlFor="first_name">Nombre:</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    type="text"
                    value={userData?.first_name}
                    placeholder="Nombre"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="last_name">Apellido:</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={userData?.last_name}
                    placeholder="Apellido"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="email">Email:</Label>
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    value={userData?.email}
                    placeholder="Email"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex justify-center mt-5">
                <Button type="submit" className="w-1/3 py-2 rounded-[40px]">
                  Modificar Usuario
                </Button>
              </div>
            </form>
          </div>
        </div>
      </ContainerDashboard>
    </div>
  );
};

export default UpdateUser;
