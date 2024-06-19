"use client";

// Estilos y componentes
import {
  Button,
  ContainerDashboard,
  Label,
  Select,
  Title,
} from "@/components/ui";
import Swal from "sweetalert2";
import { areFieldsNotEmpty } from "@/helpers/Validations/validate.empty";

// Endpoints
import { newMessage } from "@/helpers/fetch.messages.user";
import { getUserById } from "@/helpers/fetch.helper.user";

// Interfaces
import { IFunctionalUnits } from "@/Interfaces/functionalUnits.interfaces";
import { INewMessage } from "@/Interfaces/messages.interfaces";

// Hooks
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";

// ------------------------------------

const News: React.FC = () => {
  useAuth();
  const { token, data } = useSesion();
  const initialData: INewMessage = {
    user_id: data.id,
    functional_unit_id: "",
    subject: "",
    content: "",
  };
  const router = useRouter();
  const [dataMessage, setDataMessage] = useState<INewMessage>(initialData);
  const [functionalUnit, setFunctionalUnit] = useState<IFunctionalUnits[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!areFieldsNotEmpty(dataMessage)) {
      Swal.fire({
        title: "mensaje vacio",
        text: "Por favor ingrese un mensaje",
      });
      return;
    }

    try {
      const response = await newMessage(token, dataMessage);
      if (response) {
        Swal.fire({
          title: "mensaje enviado",
          text: "Su mensaje fue enviado correctamente",
        });
        setDataMessage(initialData);
        router.push("/dashboard/usuario/news");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await getUserById(data.id, token);
        if (response) {
          const datos = await response.json();
          setFunctionalUnit(datos.functional_units);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (data && token) {
      fecthData();
      setDataMessage((prevData) => ({
        ...prevData,
        user_id: data.id,
      }));
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDataMessage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="h-screen">
      <ContainerDashboard>
        <Title>
          Mensajes <span className="text-2xl font-thin">| Nuevo mensaje</span>
        </Title>

        <div className="w-[50%] mt-5">
          <div className="w-full h-auto p-4 text-white border rounded-[40px]">
            <div className="my-2 text-center">
              <h1 className="mb-2 text-2xl font-bold">Crear nuevo mensaje</h1>
            </div>
            <form
              className="mx-10 my-5"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <Label htmlFor="functional_unit_id">Unidad Funcional:</Label>
                  <Select
                    name="functional_unit_id"
                    id="functional_unit_id"
                    value={dataMessage.functional_unit_id}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Seleccione la unidad funcional
                    </option>
                    {functionalUnit &&
                      functionalUnit.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.location}
                        </option>
                      ))}
                  </Select>
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="subject">Asunto:</Label>
                  <Select
                    id="subject"
                    name="subject"
                    value={dataMessage.subject}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Seleccione el Asunto
                    </option>
                    <option value="Reclamo">Reclamo</option>
                    <option value="Consulta">Consulta</option>
                    <option value="Sugerencia">Sugerencia</option>
                    <option value="Solicitud de Mantenimiento">
                      Solicitud de Mantenimiento
                    </option>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="content">Mensaje:</Label>
                  <textarea
                    id="content"
                    name="content"
                    className="flex w-full px-2 my-1 text-gray-200 rounded-md shadow-xl bg-input placeholder:font-extralight placeholder:text-gray-500 focus:outline-none h-[200px]"
                    value={dataMessage.content}
                    placeholder="Escribe aquí tu mensaje"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-center mt-5">
                  <Button className="w-1/3 py-2 rounded-[40px]">
                    Enviar Mensaje
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
export default News;
