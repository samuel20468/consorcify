"use client";

// Estilos y componentes
import { Button, ContainerDashboard, Select, Title } from "@/components/ui";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdHomeWork } from "react-icons/md";
import { formatDate, formatMoney } from "@/helpers/functions.helper";
import Swal from "sweetalert2";

// Endpoints
import "./expenseDetail.css";
import { expensesIdFu } from "@/helpers/fetch.helper.uf";
import { getUserById } from "@/helpers/fetch.helper.user";
import { useUfSesion } from "@/helpers/useUfSesion";

// Interfaces
import {
  IFunctionalUnitExpenses,
  IFunctionalUnits,
} from "@/Interfaces/functionalUnits.interfaces";
import { IUser } from "@/Interfaces/user.interfaces";

// Hooks
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import Link from "next/link";

// ------------------------------------

const Expenses = () => {
  useAuth();
  const path = usePathname();
  const { token, data } = useSesion();
  const [user, setUser] = useState<IUser>();
  const [functionalUnit, setFunctionalUnit] = useState<IFunctionalUnits[]>([]);
  const [expenses, setExpenses] = useState<IFunctionalUnitExpenses>();
  const [fUnitExpenses, setfUnitExpenses] = useState<IFunctionalUnitExpenses[]>(
    []
  );
  const [selectetUF, setSelectetUF] = useState<string>("");
  const { haveUF, isLoading } = useUfSesion();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !haveUF) {
      router.push("/dashboard/usuario/addfuncionalunit");
    }
  }, [isLoading, haveUF, router]);

  useEffect(() => {
    const fecthUser = async () => {
      try {
        const response = await getUserById(data.id, token);

        if (response?.ok) {
          const datos = await response.json();
          setUser(datos);
          setFunctionalUnit(datos?.functional_units);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
      fecthUser();
    }
  }, [token, path]);

  useEffect(() => {
    const fechtExpenses = async () => {
      if (!selectetUF) {
        return; // No hacer la solicitud si no hay unidad funcional seleccionada
      }
      try {
        const response = await expensesIdFu(fUnitExpenses[0].id, token);
        if (response) {
          setExpenses(response);
        } else {
          Swal.fire({
            title: "Error",
            text: "Error al obtener la unidad funcional",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (token && selectetUF !== "") {
      fechtExpenses();
    }
  }, [token, selectetUF]);

  useEffect(() => {
    const fechtExpenses = async () => {
      if (!selectetUF) {
        return;
      }
      try {
        const response = await expensesIdFu(selectetUF, token);
        if (response) {
          setfUnitExpenses(response);
        } else {
          Swal.fire({
            title: "Error",
            text: "Error al obtener las expensas",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (token && selectetUF !== "") {
      fechtExpenses();
    }
  }, [selectetUF, token]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (value === "") {
      setSelectetUF("");
      setExpenses(undefined);
    } else {
      setSelectetUF(value);
    }
  };

  return (
    <div className="h-screen">
      <ContainerDashboard>
        <Title>Expensas</Title>
        <div className="flex justify-around w-[95%] h-[70px] gap-5 mt-5">
          {/* Seleccionar unidad funcional */}
          <div className="flex items-center w-1/2 border gradExpense">
            <div className="flex justify-center w-1/3">
              <GiTakeMyMoney size={50} />
            </div>

            <div className="flex flex-col items-center justify-center w-1/3">
              <p className="flex items-center justify-center">Saldo</p>
              <p className="flex items-center justify-center w-full text-2xl">
                {expenses !== undefined
                  ? formatMoney(fUnitExpenses[0].total_amount)
                  : 0}
              </p>
            </div>

            <div className="flex justify-center w-1/3">
              <Link
                href={`/dashboard/usuario/expenses/${fUnitExpenses[0]?.id}`}
              >
                <Button
                  className="w-24 py-2 rounded-[40px] disabled:pointer-events-none"
                  disabled={expenses === undefined}
                >
                  Pagar
                </Button>
              </Link>
            </div>
          </div>

          {/* Unidad Funcional */}
          <div className="flex items-center w-1/2 border gradExpense">
            <div className="flex justify-center w-1/3">
              <MdHomeWork size={50} />
            </div>
            <div className="flex items-center justify-center w-2/3 gap-3">
              <p className="flex items-center justify-center">
                Unidad Funcional:
              </p>
              <p className="flex items-center justify-center">
                <Select
                  onChange={handleChange}
                  value={selectetUF}
                  name="id"
                  id="id"
                >
                  <option value="" disabled>
                    Selecciona tu unidad Funcional
                  </option>
                  {functionalUnit?.map((unit) => (
                    <option value={unit.id} key={unit.id}>
                      {unit.location}
                    </option>
                  ))}
                </Select>
              </p>
            </div>
          </div>
        </div>

        {/* Historial de expensas */}
        <div className="flex flex-col border rounded-[40px] h-auto min-h-[400px] w-[90%] mt-5">
          <div className="flex items-center px-10 w-[98%] py-4 border-b-2 self-center">
            <p className="text-2xl">Historial de expensas</p>
          </div>

          <div className="flex flex-col w-full p-5">
            <div className="flex justify-center w-full pb-1 mb-5 border-b">
              <div className="flex justify-center w-1/5 text-xl">Período</div>
              <div className="flex justify-center w-1/5 text-xl">
                Vencimiento
              </div>
              <div className="flex justify-center w-1/5 text-xl">Monto</div>
              <div className="flex justify-center w-1/5 text-xl">Estado</div>
              <div className="flex justify-center w-1/5 text-xl">Detalle</div>
            </div>
            <div className="flex flex-col gap-3">
              {selectetUF !== "" &&
                fUnitExpenses.map((fUnitExpense) => (
                  <div
                    key={fUnitExpense.id}
                    className="flex border items-center py-2 rounded-[40px]"
                  >
                    {/* Período */}
                    <div className="flex justify-center w-1/5">
                      {fUnitExpense?.expense?.expiration_date?.split("-")?.[1]}{" "}
                      /{" "}
                      {fUnitExpense?.expense?.expiration_date?.split("-")?.[0]}
                    </div>
                    {/* Vencimiento */}
                    <div className="flex justify-center w-1/5">
                      {formatDate(fUnitExpense.expense.expiration_date)}
                    </div>
                    {/* Monto */}
                    <div className="flex justify-center w-1/5">
                      {formatMoney(fUnitExpense?.total_amount)}
                    </div>
                    {/* Estado */}
                    <div className="flex items-center justify-center w-1/5">
                      {fUnitExpense?.payment_status === "Impago" && (
                        <span className="text-redd ">
                          {fUnitExpense?.payment_status}
                        </span>
                      )}
                      {fUnitExpense?.payment_status === "Pagado" && (
                        <span className="text-greenn">
                          {fUnitExpense?.payment_status}
                        </span>
                      )}
                      {fUnitExpense?.payment_status === "Parcial" && (
                        <span className="text-yelloww">
                          {fUnitExpense?.payment_status}
                        </span>
                      )}
                    </div>
                    {/* Detalle */}
                    <div className="flex items-center justify-center w-1/5">
                      <Link
                        href={`/dashboard/usuario/expenses/expenseDetail/${fUnitExpense?.id}`}
                      >
                        <Button className="w-32 rounded-[40px] py-2">
                          Ver Detalle
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </ContainerDashboard>
    </div>
  );
};
export default Expenses;
