"use client";
import { IFunctionalUnitExpenses } from "@/Interfaces/functionalUnits.interfaces";
import { ContainerDashboard, Title } from "@/components/ui";
import { fUEById } from "@/helpers/fetch.helper.uf";
import {
  formatDate,
  formatMoney,
  formatearNumero,
} from "@/helpers/functions.helper";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ExpenseDetail = () => {
  useAuth();
  const { id }: { id: string } = useParams();
  const router = useRouter();
  const path = usePathname();
  const { token } = useSesion();
  const [functionalUnitExpense, setFunctionalUnitExpense] =
    useState<IFunctionalUnitExpenses>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fUEById(id, token);
        if (response) {
          const data = await response.json();
          setFunctionalUnitExpense(data);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se encontró la expensa",
          });
          router.push("/dashboard/admin/expenses");
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
      fetchData();
    }
  }, [path, token, id, router]);

  return (
    <div className="h-screen">
      <ContainerDashboard>
        <Title>
          Expensas
          <span className="text-2xl font-thin"> | Detalle de expensa</span>
        </Title>
        <div className="bg-whitee h-auto w-[800px] rounded-[40px] mt-5 p-5 flex flex-col text-blackk mb-8">
          <div className="flex justify-center w-full pb-3 border-b-2 border-blackk">
            <h1 className="text-3xl font-bold">
              {functionalUnitExpense?.expense?.name}
            </h1>
          </div>
          {/* ------------------ Datos ------------------ */}
          <div className="flex flex-col mt-2">
            <div className="flex justify-around w-full pb-3 border-b-2 border-blackk">
              <div className="w-1/2">
                <h1 className="text-2xl font-light text-center">
                  Administración
                </h1>
                <div className="flex flex-col gap-1 mt-1">
                  <h1 className="text-lg font-thin">
                    <span className="font-bold">Nombre: </span>
                    {functionalUnitExpense?.expense.consortium.c_admin.name}
                  </h1>
                  <div className="flex gap-8">
                    <h1 className="text-lg font-thin">
                      <span className="font-bold">CUIT: </span>
                      {formatearNumero(
                        functionalUnitExpense?.expense.consortium.c_admin.cuit
                      )}
                    </h1>
                    <h1 className="text-lg font-thin">
                      <span className="font-bold">R.P.A.: </span>
                      {functionalUnitExpense?.expense.consortium.c_admin.rpa}
                    </h1>
                  </div>
                  <h1 className="text-lg font-thin">
                    <span className="font-bold">Domicilio: </span>
                    {functionalUnitExpense?.expense.consortium.c_admin.address}
                  </h1>
                  <div className="flex gap-4">
                    <h1 className="text-lg font-thin">
                      <span className="font-bold">Mail: </span>
                      {functionalUnitExpense?.expense.consortium.c_admin.email}
                    </h1>
                    <h1 className="text-lg font-thin">
                      <span className="font-bold">Teléfono: </span>
                      {
                        functionalUnitExpense?.expense.consortium.c_admin
                          .phone_number
                      }
                    </h1>
                  </div>
                </div>
              </div>

              <div className="w-1/2">
                <h1 className="text-2xl font-light text-center">Consorcio</h1>
                <div className="flex flex-col gap-1 mt-1">
                  <h1 className="text-lg font-thin">
                    <span className="font-bold">Nombre del consorcio: </span>{" "}
                    {functionalUnitExpense?.expense.consortium.name}
                  </h1>
                  <h1 className="text-lg font-thin">
                    <span className="font-bold">CUIT: </span>
                    {formatearNumero(
                      functionalUnitExpense?.expense.consortium.cuit
                    )}
                  </h1>
                  <h1 className="text-lg font-thin">
                    <span className="font-bold">Domicilio: </span>
                    {functionalUnitExpense?.expense.consortium.street_name}{" "}
                    {functionalUnitExpense?.expense.consortium.building_number}
                  </h1>
                  <h1 className="text-lg font-thin">
                    <span className="font-bold">Unidades funcionales: </span>
                    {functionalUnitExpense?.expense.consortium.ufs}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          {/* ------------------ Gastos ------------------ */}
          <div className="flex justify-center w-full mt-2">
            <h1 className="text-2xl font-bold">Gastos </h1>
          </div>
          <div className="flex justify-center w-full h-auto py-2 text-black">
            <p className="flex items-center justify-center w-1/3 text-xl">
              Fecha
            </p>
            <p className="flex items-center justify-center w-1/3 text-xl">
              Categoría
            </p>
            <p className="flex items-center justify-center w-1/3 text-xl">
              Total
            </p>
          </div>
          <div className="flex flex-col w-full gap-2 pb-3 border-b-2 border-blackk">
            {functionalUnitExpense?.expense?.expenditures?.map(
              (expenditure) => (
                <div key={expenditure.id} className="flex mb-3">
                  <p className="flex items-center justify-center w-1/3">
                    {formatDate(expenditure.date)}
                  </p>
                  <p className="flex items-center justify-center w-1/3">
                    {expenditure.category}
                  </p>
                  <p className="flex items-center justify-center w-1/3">
                    {formatMoney(expenditure.total_amount)}
                  </p>
                </div>
              )
            )}
            <div className="flex items-center justify-end mr-10 text-xl">
              <span className="font-bold">Total:</span>{" "}
              {formatMoney(functionalUnitExpense?.expense.total_amount)}
            </div>
          </div>

          {/* ------------------ Expensa ------------------ */}
          <div className="flex justify-center w-full mt-2">
            <h1 className="text-2xl font-bold">Detalle de expensas</h1>
          </div>
          <div className="flex flex-col gap-2 pb-3 mt-2">
            <div className="flex justify-around">
              <h1 className="text-lg font-thin">
                <span className="font-bold">Propietario: </span>
                {functionalUnitExpense?.functional_unit.owner}
              </h1>
              <h1 className="text-lg font-thin">
                <span className="font-bold">Categoría: </span>
                {functionalUnitExpense?.functional_unit.type}
              </h1>
              <h1 className="text-lg font-thin">
                <span className="font-bold">Departamento: </span>
                {functionalUnitExpense?.functional_unit.number}
              </h1>
            </div>
            <div className="flex justify-around">
              <h1 className="text-lg font-thin">
                <span className="font-bold">Mail: </span>
                {functionalUnitExpense?.functional_unit.owner_email}
              </h1>
              <h1 className="text-lg font-thin">
                <span className="font-bold">Teléfono: </span>
                {functionalUnitExpense?.functional_unit.owner_phone_number}
              </h1>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between mt-2">
              <h1 className="flex items-center justify-center w-1/2 text-xl font-bold">
                Detalle
              </h1>
              <h1 className="flex items-center justify-center w-1/2 text-xl font-bold">
                Monto
              </h1>
            </div>
            <div className="flex justify-between mt-2 text-center">
              <h1 className="flex items-center justify-center w-1/2 text-lg">
                Saldo anterior
              </h1>
              <h1 className="flex items-center justify-center w-1/2 text-lg">
                {formatMoney(functionalUnitExpense?.previous_balance)}
              </h1>
            </div>
            <div className="flex justify-between mt-2 text-center">
              <h1 className="flex items-center justify-center w-1/2 text-lg">
                Intereses (
                {functionalUnitExpense?.expense.consortium.interest_rate}%)
              </h1>
              <h1 className="flex items-center justify-center w-1/2 text-lg">
                {formatMoney(functionalUnitExpense?.interests)}
              </h1>
            </div>
            <div className="flex justify-between mt-2 text-center">
              <h1 className="flex items-center justify-center w-1/2 text-lg">
                Gasto mensual:{" "}
              </h1>
              <h1 className="flex items-center justify-center w-1/2 text-lg">
                <span className="px-6 pb-4 border-b-2 border-blackk">
                  {formatMoney(functionalUnitExpense?.monthly_expenditure)}
                </span>
              </h1>
            </div>
            <div className="flex justify-between mt-2 text-center">
              <h1 className="flex items-center justify-center w-1/2 text-lg">
                Total{" "}
              </h1>
              <h1 className="flex items-center justify-center w-1/2 text-lg">
                {formatMoney(functionalUnitExpense?.total_amount)}
              </h1>
            </div>
          </div>
        </div>
      </ContainerDashboard>
    </div>
  );
};

export default ExpenseDetail;
