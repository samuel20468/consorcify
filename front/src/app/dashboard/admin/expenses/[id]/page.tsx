"use client";

// Estilos y componentes
import { Button, ContainerDashboard, Title } from "@/components/ui";
import Swal from "sweetalert2";

// Endpoints
import {
  closeExpense,
  getExpenseById,
  settleExpense,
} from "@/helpers/fetch.helper.expense";

// Interfaces
import { IExpense } from "@/Interfaces/expenses.interfaces";

// Hooks
import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import Link from "next/link";
import { formatDate, formatMoney } from "@/helpers/functions.helper";

// ------------------

const Page = () => {
  useAuth();
  const router = useRouter();
  const path = usePathname();
  const { token } = useSesion();
  const { id }: { id: string } = useParams();
  const [expensa, setExpensa] = useState<IExpense>();

  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await getExpenseById(token, id);
        if (response) {
          const data = await response.json();
          setExpensa(data);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se encontró la expensa",
          });
          router.push("/dashboard/admin/expenses");
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (token) {
      fecthData();
    }
  }, [path, token, id, router]);

  const handleSubmit = () => {
    Swal.fire({
      icon: "warning",
      title: "Estas seguro que quieres cerrarla?",
      text: "Una vez completado no podras volver atras",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonColor: "green",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await settleExpense(token, expensa?.id!);
          if (response) {
            const res = await closeExpense(token, expensa?.id!);
            if (res) {
              Swal.fire({
                icon: "success",
                title: "Expensa ejecutada correctamente",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "hubo un error el en proceso",
                text: "Intentalo mas tarde",
              });
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "Hubo un error al procesar la expensa",
              text: "Intentalo mas tarde",
            });
          }
        } catch (error: any) {
          error.message;
          Swal.fire({
            title: "Error de información",
            text: (error as Error).message,
            icon: "error",
            confirmButtonColor: "#0b0c0d",
          });
        }
      }
    });
  };

  return (
    <div className="h-screen">
      <ContainerDashboard>
        {expensa && (
          <Title>
            Expensas{" "}
            <span className="text-2xl font-light">| {expensa?.name}</span>
          </Title>
        )}
        {expensa ? (
          <div className="w-[95%] h-full flex flex-col">
            <div className="flex justify-center w-full h-auto py-2">
              <p className="flex items-center justify-center w-1/4">Fecha</p>
              <p className="flex items-center justify-center w-1/4">
                Descripción
              </p>
              <p className="flex items-center justify-center w-1/4">
                Categoría
              </p>
              <p className="flex items-center justify-center w-1/4">Total</p>
            </div>
            <div
              className="w-full h-[60vh]
                    flex flex-col  gap-2"
            >
              {expensa.expenditures.map((expenditure) => (
                <div
                  key={expenditure.id}
                  className="text-white w-full border rounded-[40px] flex items-center py-3"
                >
                  <p className="flex items-center justify-center w-1/4">
                    {formatDate(expenditure.date)}
                  </p>
                  <p className="flex items-center justify-center w-1/4">
                    {expenditure.description}
                  </p>
                  <p className="flex items-center justify-center w-1/4">
                    {expenditure.category}
                  </p>
                  <p className="flex items-center justify-center w-1/4">
                    {formatMoney(expenditure.total_amount)}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end w-full gap-2 py-2">
              <div className="flex items-center justify-end w-1/4 text-xl">
                TOTAL: {formatMoney(expensa.total_amount)}
              </div>
              {expensa.status !== "Cerrada" && (
                <Button
                  onClick={handleSubmit}
                  className=" w-40 py-2 rounded-[40px]"
                >
                  Cerrar Expensa
                </Button>
              )}
            </div>
          </div>
        ) : (
          <p className="items-center justify-center w-full h-full">
            Cargando...
          </p>
        )}
      </ContainerDashboard>
    </div>
  );
};
export default Page;
