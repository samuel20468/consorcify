"use client";
import { RxCross1 } from "react-icons/rx";
import { IoCheckmarkOutline } from "react-icons/io5";
import {
  IFunctionalUnitExpenses,
  IFunctionalUnits,
} from "@/Interfaces/functionalUnits.interfaces";
import { IUser } from "@/Interfaces/user.interfaces";
import { Button, ContainerDashboard, Select, Title } from "@/components/ui";
import {
  expensesIdFu,
  functionalUnitExpensesId,
} from "@/helpers/fetch.helper.uf";
import { getUserById } from "@/helpers/fetch.helper.user";
import {
  AccountBalance,
  ArrowBack,
  Home,
  HomeTwo,
  Stroke,
} from "@/helpers/icons.helper";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useUfSesion } from "@/helpers/useUfSesion";

const Expenses = () => {
  useAuth();
  const path = usePathname();
  const { token, data } = useSesion();
  const [user, setUser] = useState<IUser>();
  const [functionalUnit, setFunctionalUnit] = useState<IFunctionalUnits[]>([]);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [expenses, setExpenses] = useState<IFunctionalUnitExpenses>();
  const [fUnitExpenses, setfUnitExpenses] = useState<IFunctionalUnitExpenses[]>(
    []
  );
  const [selectetUF, setSelectetUF] = useState<string>("");
  const { haveUF, isLoading, functional_unit } = useUfSesion();
  const router = useRouter();
  console.log(functionalUnit);
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
        const fetchData = async () => {
            if (!selectetUF) return;
            try {
                const responseExpenses = await expensesIdFu(selectetUF, token);
                if (responseExpenses) {
                    setfUnitExpenses(responseExpenses);
                    const firstExpenseId = responseExpenses[0]?.id;
                    if (firstExpenseId) {
                        const responseDetails = await functionalUnitExpensesId(firstExpenseId, token);
                        if (responseDetails) {
                            setExpenses(responseDetails);
                        } else {
                            Swal.fire({
                                title: "Error",
                                text: "Error al obtener la unidad funcional",
                                icon: "error",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        }
                    }
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
            fetchData();
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
        <div className="flex items-center justify-around  rounded-[40px] h-[15%] w-full gap-5 mt-5">
          {/* Seleccionar unidad funcional */}
          <div className="flex items-center justify-center w-1/2 h-[80px] border rounded-[40px] bg-gradient-to-r from-neutral-50 via-fondo to-fondo">
            <div className="flex items-center justify-center w-full h-full">
              <AccountBalance className="w-10 text-black" />
            </div>
            <div className="flex">
              <div className="flex flex-col items-center justify-center w-full h-full itc">
                <p className="flex items-center justify-center w-full h-1/4">
                  Saldo
                </p>
                <p className="flex items-center justify-center w-full text-2xl h-1/4">
                    {expenses != undefined ? fUnitExpenses[0]?.functional_unit?.balance : 0}
                </p>
              </div>
                {fUnitExpenses.length > 0 && (
                            fUnitExpenses[0]?.functional_unit?.balance > 0 ? (
                                <Link href={`/dashboard/usuario/expenses/${fUnitExpenses[0]?.id}`}>
                                    <Button className="w-32 rounded-[40px]">
                                        Pagar
                                    </Button>
                                </Link>
                            ) : (
                                <Button
                                    className="w-32 rounded-[40px] bg-gray-400 cursor-not-allowed"
                                    disabled
                                >
                                    Pagar
                                </Button>
                            )
                )}
            </div>
          </div>

          {/* Unidad Funcional */}
          <div className="flex items-center justify-center w-1/2 h-full border rounded-[40px] gap-2 bg-gradient-to-r from-neutral-50 via-fondo to-fondo">
            <div className="flex items-center justify-center w-full h-full itc">
              <HomeTwo className="" />
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full gap-2">
              <p className="flex items-center justify-center w-full h-1/4">
                Unidad Funcional
              </p>
              <p className="flex items-center justify-center w-auto h-1/4">
                <Select
                  onChange={handleChange}
                  value={selectetUF}
                  name="id"
                  id="id"
                >
                  <option value="">Selecciona tu unidad Funcional</option>
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
        <div className="flex flex-col border rounded-[40px] h-[500px] w-[90%] mt-5">
          <div className="flex items-center px-10 w-[98%] h-[10%] border-b-2 self-center">
            <p>Historial de expensas</p>
          </div>

          <div className="flex flex-col w-full h-[75%] p-5 gap-2">
            <div className="flex flex-col w-full gap-2">
              <div className="flex items-center justify-center w-full gap-2 border-b">
                <div className="flex justify-center w-2/3 text-xl font-bold">
                  <div className="flex justify-center w-1/3">Año</div>
                  <div className="flex justify-center w-1/3">Mes</div>
                  <div className="flex justify-center w-1/3">Monto</div>
                </div>
                <div className="flex justify-center w-1/3 ">
                  <div className="flex items-center justify-center w-1/2">
                    Estado
                  </div>
                  <div className="flex items-center justify-center w-1/2">
                    Detalle
                  </div>
                </div>
              </div>
              <div>
                {selectetUF !== "" &&
                  fUnitExpenses.map((fUnitExpense) => (
                    <div
                      key={fUnitExpense.id}
                      className="flex border w-full items-center justify-center gap-2 py-1 rounded-[40px]"
                    >
                      <div className="flex justify-center w-2/3 text-xl font-bold">
                        <div className="flex justify-center w-1/3">
                          {/* Mostrar la fecha de vencimiento de la primera expense */}
                          {
                            fUnitExpense?.expense?.expiration_date?.split(
                              "-"
                            )?.[0]
                          }
                        </div>
                        <div className="flex justify-center w-1/3">
                          {
                            fUnitExpense?.expense?.expiration_date?.split(
                              "-"
                            )?.[1]
                          }
                        </div>
                        <div className="flex justify-center w-1/3">
                          {fUnitExpense?.total_amount}
                        </div>
                      </div>
                      <div className="flex justify-center w-1/3 ">
                        <div
                          className={`w-1/2 flex justify-center items-center `}
                        >
                          {fUnitExpense?.payment_status === "Impago" && (
                            <span className="text-red-500 ">
                              {fUnitExpense?.payment_status}
                            </span>
                          )}
                          {fUnitExpense?.payment_status === "Pagado" && (
                            <span className="text-green-500">
                              {fUnitExpense?.payment_status}
                            </span>
                          )}
                          {fUnitExpense?.payment_status === "Parcial" && (
                            <span className="text-yellow-500">
                              {fUnitExpense?.payment_status}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-center w-1/2">
                          <Link
                            href={`/dashboard/usuario/expenses/expenseDetail/${fUnitExpense?.id}`}
                          >
                            <Button className="w-32 rounded-[40px] py-2">
                              Ver Detalle
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </ContainerDashboard>
    </div>
  );
};
export default Expenses;
