"use client";

// Estilos y componentes
import {
  Button,
  ContainerDashboard,
  Input,
  Label,
  Title,
} from "@/components/ui";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import { validatePwd } from "@/helpers/Validations/validate.password";
import Swal from "sweetalert2";

// Endpoints
import { updatePassFetch } from "@/helpers/fetch.helper.updatePass";
import { getUserById } from "@/helpers/fetch.helper.user";
import { getAdminById } from "@/helpers/fetch.helper.admin";

// Interfaces
import { IUser } from "@/Interfaces/user.interfaces";
import { IAdmin } from "@/Interfaces/admin.interfaces";

// Hooks
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";

// -------------------------

const UpdatePassword = () => {
  useAuth();
  const { token, data } = useSesion();
  const router = useRouter();
  const initialData = {
    old_password: "",
    password: "",
  };
  const [userData, setUserData] = useState<IUser>();
  const [adminData, setAdminData] = useState<IAdmin>();
  const [pass2, setPass2] = useState("");
  const [lock, setLock] = useState<boolean>(true);
  const [errors, SetErrors] = useState(initialData);
  const [passwords, setPasswords] = useState(initialData);
  const role = data.roles;
  const prevTokenRef = useRef<string | null>(null);

  useEffect(() => {
    const oldPassErrors = validatePwd("old_password", passwords.old_password);
    const newPassErrors = validatePwd("password", passwords.password);

    SetErrors((prevErrors) => ({
      ...prevErrors,
      ...oldPassErrors,
      ...newPassErrors,
    }));
  }, [passwords]);
  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (!passwords.password || !passwords.old_password || !pass2) {
      Swal.fire({
        title: "Error al actualizar contraseña",
        text: "Asegúrate de completar todos los campos del formulario.",
        icon: "error",
        confirmButtonColor: "#0b0c0d",
      });
    } else {
      let entity = "cadmin";
      if (role[0] === "user" || role[0] === "superadmin") {
        entity = "user";
      }
      try {
        const response = await updatePassFetch(
          passwords,
          entity,
          data.id,
          token
        );
        if (response) {
          Swal.fire({
            title: "Contraseña actualizada",
            text: "Has actualizado correctamente tu contraseña",
            icon: "success",
            confirmButtonColor: "#0b0c0d",
          }).then((res) => {
            if (res.isConfirmed) {
              router.push("/dashboard/profile");
            }
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error al actualizar la contraseña",
          text: (error as Error).message,
          icon: "error",
          confirmButtonColor: "#0b0c0d",
        });
      }
    }
  };

  useEffect(() => {
    if (token && token !== prevTokenRef.current) {
      const fetchData = async () => {
        try {
          if (data.roles?.[0] === "user" || data.roles?.[0] === "superadmin") {
            const response = await getUserById(data.id, token);
            if (response?.ok) {
              const data = await response.json();
              setUserData(data);
            }
          } else {
            const response = await getAdminById(data.id, token);
            if (response?.ok) {
              const data = await response.json();
              setAdminData(data);
            }
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
    prevTokenRef.current = token;
  }, [token, data]);

  const handleLock = () => {
    setLock(!lock);
  };

  const handlePass2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass2(e.target.value);
  };

  return (
    <div className="h-screen">
      <ContainerDashboard>
        <Title>
          {data.roles?.[0] === "user" || data.roles?.[0] === "superadmin"
            ? userData?.first_name + " " + userData?.last_name
            : adminData?.name}{" "}
          <span className="text-2xl font-thin">| Actualizar contraseña</span>
        </Title>
        <div className="w-[50%] mt-5">
          <div className="w-full h-auto p-4 text-white border rounded-[40px]">
            <div className="my-2 text-center">
              <h1 className="mb-2 text-2xl font-bold">Modificar contraseña</h1>
            </div>
            <form
              className="mx-10 my-5"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between w-full">
                    <Label htmlFor="pwd">Contraseña actual:</Label>
                    {errors.old_password && passwords.old_password && (
                      <span className="self-end text-[10px] text-redd ">
                        {errors.old_password}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between w-full h-10 my-1 rounded-md">
                    <Input
                      id="pwd"
                      name="old_password"
                      type={lock ? "password" : "text"}
                      placeholder="**********"
                      onChange={handlerChange}
                      value={passwords.old_password}
                    />
                    <button
                      type="button"
                      className="w-8 ml-2"
                      onClick={handleLock}
                    >
                      {lock ? <PiEyeClosed size={25} /> : <PiEye size={25} />}{" "}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center justify-between w-full">
                    <Label htmlFor="pwd">Nueva Contraseña:</Label>
                    {errors.password && passwords.password && (
                      <span className="self-end text-[10px] text-redd ">
                        {errors.password}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between w-full h-10 my-1 rounded-md">
                    <Input
                      id="pwd"
                      name="password"
                      type={lock ? "password" : "text"}
                      placeholder="**********"
                      onChange={handlerChange}
                      value={passwords.password}
                    />
                    <button
                      type="button"
                      className="w-8 ml-2"
                      onClick={handleLock}
                    >
                      {lock ? <PiEyeClosed size={25} /> : <PiEye size={25} />}{" "}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center justify-between w-full">
                    <Label htmlFor="pwd2">Repetir Contraseña:</Label>
                    {passwords.password &&
                      pass2 &&
                      passwords.password !== pass2.trim() && (
                        <span className="self-end text-[10px] text-redd ">
                          Las contraseñas deben coincidir
                        </span>
                      )}
                  </div>

                  <div className="flex items-center justify-between w-full h-10 my-1 rounded-md ">
                    <Input
                      id="pwd2"
                      name="password2"
                      type={lock ? "password" : "text"}
                      placeholder="**********"
                      onChange={handlePass2}
                      value={pass2}
                    />
                    <button
                      type="button"
                      className="w-8 ml-2"
                      onClick={handleLock}
                    >
                      {lock ? <PiEyeClosed size={25} /> : <PiEye size={25} />}{" "}
                    </button>
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <Button type="submit" className="w-1/3 py-2 rounded-[40px]">
                    Enviar
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </ContainerDashboard>
    </div>
  );
};

export default UpdatePassword;
