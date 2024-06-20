"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button, ContainerDashboard, Label, Title } from "../../components/ui";
import { useRouter } from "next/navigation";
import useSesion from "@/helpers/useSesion";
import Image from "next/image";
import {
  handleDrop,
  handleErrorResponse,
  handleFileChange,
  handleSuccessResponse,
  preventDefaults,
  uploadImage,
} from "@/helpers/toUpdateImage/updateImage.helper";
import { getUserById } from "@/helpers/fetch.helper.user";
import Swal from "sweetalert2";
import { IAdmin } from "@/Interfaces/admin.interfaces";
import { getAdminById } from "@/helpers/fetch.helper.admin";
import { IUser } from "@/Interfaces/user.interfaces";

const AddAvatar: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();
  const { token, data } = useSesion();
  const [user, setUser] = useState<IUser>();
  const [admin, setAdmin] = useState<IAdmin>();
  const id = data.id;
  const role = data.roles[0];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await (role === "cadmin"
          ? getAdminById(id, token)
          : getUserById(id, token));
        if (response.ok) {
          if (role === "cadmin") {
            const data = await response.json();
            setAdmin(data);
          } else {
            const data = await response.json();
            setUser(data);
          }
        } else {
          Swal.fire({
            title: "Error",
            text: "Ocurrió un error al traer los datos del usuario",
            icon: "error",
            confirmButtonColor: "#0b0c0d",
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
      fetchUser();
    }
  }, [token, id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      fileInputRef.current &&
      fileInputRef.current.files &&
      fileInputRef.current.files.length > 0
    ) {
      const formData = new FormData();
      formData.append("image", fileInputRef.current.files[0]);
      try {
        const endpoint =
          role == "cadmin" ? `update-cadmin/${id}` : `update-user/${id}`;
        console.log(endpoint);
        const response = await uploadImage(formData, endpoint, token);
        if (response.ok) {
          handleSuccessResponse(router);
        } else {
          throw new Error("Hubo un error al actualizar tu imagen de perfil.");
        }
      } catch (error: any) {
        handleErrorResponse(error);
      }
    }
  };

  return (
    <div className="h-screen">
      <ContainerDashboard>
        <Title>
          {data.roles?.[0] === "user" || data.roles?.[0] === "superadmin"
            ? user?.first_name + " " + user?.last_name
            : admin?.name}
          <span className="text-2xl font-thin"> | Cambiar imagen</span>
        </Title>
        <div className="w-[50%] mt-5">
          <div className="w-full h-auto min-h-[400px] p-4 text-white border rounded-[40px]">
            <div className="my-2 text-center">
              <h1 className="mb-2 text-2xl font-bold">Modificar imágen</h1>
            </div>
            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              className="mx-10 my-5"
            >
              <div
                className="flex flex-col border border-dashed rounded-[40px] p-10 cursor-pointer items-center justify-center h-[300px] mb-6"
                onDragOver={(event) => preventDefaults(event)}
                onDragEnter={(event) => preventDefaults(event)}
                onDrop={(event) => handleDrop(event, setImage, fileInputRef)}
              >
                {image ? (
                  <Image
                    src={image}
                    alt="Preview"
                    className="object-cover w-full h-full"
                    width={300}
                    height={300}
                  />
                ) : (
                  <p>
                    Arrastra y suelta una imagen aquí o usa el input de abajo
                  </p>
                )}
              </div>
              <div className="flex justify-center mt-5">
                <Label
                  htmlFor="fileInput"
                  className="flex justify-center items-center w-1/3 px-5 py-2 rounded-[40px] bg-[#e5e7eb] text-black cursor-pointer"
                >
                  Seleccionar Imagen
                </Label>
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(event) => handleFileChange(event, setImage)}
                id="fileInput"
                className="hidden"
              />
              <div className="flex justify-center mt-5">
                <Button type="submit" className="w-full py-2 rounded-[40px]">
                  Enviar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </ContainerDashboard>
    </div>
  );
};

export default AddAvatar;
