"use client";

// Estilos y componentes
import { Button, Input, Label, Select } from "../ui";
import Swal from "sweetalert2";

// Iterfaces
import {
  INewRegisterAdmin,
  INewRegisterAdminError,
} from "@/Interfaces/admin.interfaces";

// Validaciones
import { validateCuit } from "@/helpers/Validations/validate.cuit";
import { validateNombre } from "@/helpers/Validations/validate.name";
import { validateRPA } from "@/helpers/Validations/validate.rpa";
import { validateEmail } from "@/helpers/Validations/validate.email";

// Endpoints
import {
  adminFetch,
  getAdminById,
  updateAdmin,
} from "@/helpers/fetch.helper.admin";

// Hooks
import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import { validatePhoneNumber } from "@/helpers/Validations/validate.telephone";

// -----------------

const FormRegisterAdmin = ({ update = false }) => {
  useAuth();
  const path = usePathname();
  const router = useRouter();
  const initialData = {
    name: "",
    address: "",
    phone_number: "",
    cuit: "",
    sat: "",
    rpa: "",
    email: "",
  };
  const { token } = useSesion();
  const params: { id: string } = useParams();
  const [adminRegister, setAdminRegister] =
    useState<INewRegisterAdmin>(initialData);
  const [errorAdminRegister, setErrorAdminRegister] =
    useState<INewRegisterAdminError>(initialData);

  useEffect(() => {
    const fetchData = async () => {
      if (update && !params.id) {
        console.error("El ID del administrador es undefined o vacío");
        return;
      }
      try {
        const response = await getAdminById(params.id, token);
        if (response?.ok) {
          const data = await response.json();
          setAdminRegister(data);
        } else {
          console.error(`Error: ${response?.statusText}`);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (token && update) {
      fetchData();
    }
  }, [token, path, params.id, update]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminRegister({
      ...adminRegister,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (
      !adminRegister.address ||
      !adminRegister.name ||
      !adminRegister.email ||
      !adminRegister.phone_number ||
      !adminRegister.sat ||
      !adminRegister.rpa ||
      !adminRegister.cuit
    ) {
      Swal.fire({
        title: "Formulario incompleto",
        text: "Asegúrate de completar todos los campos del formulario.",
        icon: "error",
        confirmButtonColor: "#0b0c0d",
      });
      return;
    } else {
      try {
        if (update == true) {
          const response = await updateAdmin(adminRegister, params.id, token);
          if (response) {
            Swal.fire({
              title: "Excelente",
              text: `La administración ${adminRegister.name} se modificó correctamente`,
              icon: "success",
              confirmButtonColor: "#0b0c0d",
            }).then(async (res) => {
              if (res.isConfirmed) {
                const data = await response.json();
                router.back();
              }
            });
          }
        } else {
          const response = await adminFetch(adminRegister, token);
          if (response?.ok) {
            Swal.fire({
              title: "Excelente",
              text: `La administración ${adminRegister.name} se creó correctamente`,
              icon: "success",
              confirmButtonColor: "#0b0c0d",
            }).then(async (res) => {
              const data = await response.json();

              router.push(
                `/dashboard/superadmin/administracion/All/${data.id}`
              );
            });
          }
        }
      } catch (error: any) {
        Swal.fire({
          title: "Error de información",
          text: error.message,
          icon: "error",
          confirmButtonColor: "#0b0c0d",
        });
      }
    }
  };

  useEffect(() => {
    const nameErrors = validateNombre("name", adminRegister.name);
    const cuitErrors = validateCuit(adminRegister.cuit!);
    const rpaErrors = validateRPA(adminRegister.rpa);
    const emailErrors = validateEmail(adminRegister.email);
    const phoneErrors = validatePhoneNumber(adminRegister.phone_number);

    setErrorAdminRegister((prevErrors) => ({
      ...prevErrors,
      ...nameErrors,
      ...cuitErrors,
      ...rpaErrors,
      ...emailErrors,
      ...phoneErrors,
    }));
  }, [adminRegister]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAdminRegister({
      ...adminRegister,
      [name]: value,
    });
  };

  return (
    <div className="w-full h-auto p-4 text-white border rounded-[40px]">
      <div className="my-2 text-center">
        <h1 className="mb-2 text-2xl font-bold">
          {update
            ? "Formulario de Actualización de Administrador"
            : "Formulario de Registro de Administrador"}
        </h1>
      </div>

      <form
        className="flex flex-col w-full max-w-xl"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Label htmlFor="name">
          Nombre Completo:<span className="text-redd">*</span>
        </Label>
        <Input
          id="name"
          name="name"
          value={adminRegister.name}
          type="text"
          placeholder="Nombre y Apellido"
          onChange={handleChange}
        />
        {errorAdminRegister.name && adminRegister.name && (
          <span className="self-end text-xs text-redd">
            {errorAdminRegister.name}
          </span>
        )}
        <Label htmlFor="address">
          Dirección:<span className="text-redd">*</span>
        </Label>
        <Input
          id="address"
          name="address"
          value={adminRegister.address}
          type="text"
          placeholder="Dirección"
          onChange={handleChange}
        />
        <Label htmlFor="phone_number">
          Teléfono:<span className="text-redd">*</span>
        </Label>
        <Input
          id="phone_number"
          name="phone_number"
          value={adminRegister.phone_number}
          type="text"
          placeholder="+541144332211"
          onChange={handleChange}
        />
        {errorAdminRegister.phone_number && adminRegister.phone_number && (
          <span className="self-end text-xs text-redd">
            {errorAdminRegister.phone_number}
          </span>
        )}
        <Label htmlFor="cuit">
          CUIT:<span className="text-redd">*</span>
        </Label>
        <Input
          id="cuit"
          name="cuit"
          value={adminRegister.cuit}
          type="text"
          placeholder="CUIT (sin guiones)"
          onChange={handleChange}
          disabled={update}
        />
        {errorAdminRegister.cuit && adminRegister.cuit && (
          <span className="self-end text-xs text-redd">
            {errorAdminRegister.cuit}
          </span>
        )}
        <Label htmlFor="sat">
          Situación Fiscal:<span className="text-redd">*</span>
        </Label>
        <Select
          name="sat"
          id="sat"
          value={adminRegister.sat}
          onChange={handleSelect}
        >
          <option value="" disabled>
            Seleccionar la situación tributaria
          </option>
          <option value="Monotributo">Monotributo</option>
          <option value="Responsable Inscripto">Responsable Inscripto</option>
          <option value="Responsable No Inscripto">
            Responsable No Inscripto
          </option>
          <option value="Exento">Exento</option>
        </Select>
        <Label htmlFor="rpa">
          Matrícula RPA:
          <span className="text-redd">*</span>
        </Label>
        <Input
          id="rpa"
          name="rpa"
          value={adminRegister.rpa}
          type="text"
          placeholder="12345"
          onChange={handleChange}
          disabled={update}
        />
        {errorAdminRegister.rpa && adminRegister.rpa && (
          <span className="self-end text-xs text-redd">
            {errorAdminRegister.rpa}
          </span>
        )}
        <Label htmlFor="email">
          Email:<span className="text-redd">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          value={adminRegister.email}
          type="email"
          placeholder="Correo electrónico"
          onChange={handleChange}
          disabled={update}
        />
        {errorAdminRegister.email && adminRegister.email && (
          <span className="self-end text-xs text-redd">
            {errorAdminRegister.email}
          </span>
        )}

        <div className="mt-4">
          <Button type="submit" className="w-full py-2 rounded-[40px]">
            {update ? "Modificar Administrador" : "Registrar Administrador"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormRegisterAdmin;
