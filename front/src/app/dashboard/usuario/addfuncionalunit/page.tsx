"use client";

// Estilos y componentes
import {
  Button,
  ContainerDashboard,
  Input,
  Label,
  Title,
} from "@/components/ui";
import Swal from "sweetalert2";

// Endpoints
import { linkFunctionalUnit } from "@/helpers/fetch.helper.uf";

// Hooks
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";

// -------------------------

const AddFU = () => {
  useAuth();
  const router = useRouter();
  const { token, data } = useSesion();

  const [code, setCode] = useState<string>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!code) {
      Swal.fire({
        title: "Error",
        text: "Debe ingresar un codigo de la unidad funcional",
        icon: "error",
      });
      return;
    }
    if (code.length !== 8) {
      Swal.fire({
        title: "Error",
        text: "El codigo debe tener 8 caracteres",
        icon: "error",
      });
      setCode("");
      return;
    }

    try {
      const response = await linkFunctionalUnit(data.id, token, code!);

      if (response) {
        router.push("/dashboard/usuario/information/UF");
      } else if (response.status === 409) {
        Swal.fire({
          title: "Error",
          text: "No se pudo vincular la unidad funcional a la cuenta",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: (error as Error).message,
        icon: "error",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  return (
    <div className="h-screen">
      <ContainerDashboard>
        <Title>
          Unidad funcional{" "}
          <span className="text-2xl font-thin">| Agregar unidad funcional</span>
        </Title>
        <div className="w-3/5 h-auto p-4 text-white border rounded-[40px] mt-5">
          <div className="my-2 text-center">
            <h1 className="mb-2 text-2xl font-bold">
              Agregar una unidad funcional
            </h1>
          </div>

          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="mx-10 my-5"
          >
            <div className="flex flex-col w-full">
              <Label htmlFor="functional_units">
                Codigo de la unidad funcional
              </Label>
              <Input
                id="functional_units"
                type="text"
                name="functional_units"
                placeholder="Codigo de la unidad funcional"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center mt-5">
              <Button type="submit" className="w-1/3 py-2 rounded-[40px]">
                Aceptar
              </Button>
            </div>
          </form>
        </div>
      </ContainerDashboard>
    </div>
  );
};

export default AddFU;
