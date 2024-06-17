"use client";
import { RxCross1 } from "react-icons/rx";
import { IoCheckmarkOutline } from "react-icons/io5";
import {
    IFunctionalUnitExpenses,
    IFunctionalUnits,
} from "@/Interfaces/functionalUnits.interfaces";
import { IUser } from "@/Interfaces/user.interfaces";
import { Button, ContainerDashboard, Select } from "@/components/ui";
import { functionalUnitExpensesId } from "@/helpers/fetch.helper.uf";
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
    const [functionalUnit, setFunctionalUnit] = useState<IFunctionalUnits[]>(
        []
    );
    const [totalExpenses, setTotalExpenses] = useState<number>(0);
    const [expenses, setExpenses] = useState<IFunctionalUnitExpenses>();
    const [selectetUF, setSelectetUF] = useState<string>("");

    const { haveUF, isLoading, functional_unit } = useUfSesion();
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
                const response = await functionalUnitExpensesId(
                    selectetUF,
                    token
                );
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
        <ContainerDashboard className="w-[90%] h-[90vh] justify-center p-5 gap-3">
            <div className="border rounded-[40px] h-[10%] w-full flex items-center justify-center">
                <div className="flex items-center justify-start p-3 ">
                    <Link href="/dashboard" className="w-full h-full ">
                        <ArrowBack />
                    </Link>
                </div>
                <p className="flex items-center justify-center w-full">
                    Consorcio:{" "}
                </p>
            </div>
            <div className="flex items-center justify-around  rounded-[40px] h-[15%] w-full  gap-5">
                <div className="flex items-center justify-center w-1/2 h-full border rounded-[40px] gap-2 bg-gradient-to-r from-neutral-50 via-fondo to-fondo">
                    <div className="flex items-center justify-center w-full h-full itc">
                        <AccountBalance className="w-10 text-black" />
                    </div>
                    <div className="flex flex-col items-center justify-center w-full h-full itc">
                        <p className="flex items-center justify-center w-full h-1/4">
                            Saldo
                        </p>
                        <p className="flex items-center justify-center w-full h-1/4 text-2xl">
                            $
                            {expenses != undefined ? expenses?.total_amount : 0}
                        </p>
                        <Link
                            href={`/dashboard/usuario/expenses/${selectetUF}`}
                        >
                            <Button
                                className="w-32 rounded-[40px]"
                                disabled={expenses == undefined}
                            >
                                Pagar
                            </Button>
                        </Link>
                    </div>
                </div>
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
                                <option value="">
                                    Selecciona tu unidad Funcional
                                </option>
                                {functionalUnit?.map((unit) => (
                                    <option
                                        value={
                                            unit.functional_units_expenses?.[0]
                                                ?.id
                                        }
                                        key={unit.id}
                                    >
                                        {unit.location}
                                    </option>
                                ))}
                            </Select>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col border rounded-[40px] h-[75%] w-full ">
                <div className="flex items-center px-10 w-[98%] h-[10%] border-b-2 self-center">
                    <p>Historial de expensas</p>
                </div>

                <div className="flex flex-col w-full h-[75%] p-5 gap-2">
                    <div className="flex flex-col w-full  gap-2">
                        <div className="flex border-b w-full items-center justify-center gap-2">
                            <div className="w-2/3 flex justify-center font-bold text-xl">
                                <div className="w-1/3 flex justify-center">
                                    Año
                                </div>
                                <div className="w-1/3 flex justify-center">
                                    Mes
                                </div>
                                <div className="w-1/3 flex justify-center">
                                    Monto
                                </div>
                            </div>
                            <div className="w-1/3  flex justify-center ">
                                <div className="w-1/2 flex justify-center items-center">
                                    Estado
                                </div>
                                <div className="w-1/2 flex justify-center items-center">
                                    Detalle
                                </div>
                            </div>
                        </div>
                        <div>
                            {selectetUF !== "" &&
                                functionalUnit.map((unit) => (
                                    <div
                                        key={unit.id}
                                        className="flex border w-full items-center justify-center gap-2 py-1 rounded-[40px]"
                                    >
                                        <div className="w-2/3 flex justify-center font-bold text-xl">
                                            <div className="w-1/3 flex justify-center">
                                                {/* Mostrar la fecha de vencimiento de la primera expense */}
                                                {
                                                    unit.functional_units_expenses?.[0]?.expense.expiration_date.split(
                                                        "-"
                                                    )?.[0]
                                                }
                                            </div>
                                            <div className="w-1/3 flex justify-center">
                                                {
                                                    unit.functional_units_expenses?.[0]?.expense.expiration_date.split(
                                                        "-"
                                                    )?.[1]
                                                }
                                            </div>
                                            <div className="w-1/3 flex justify-center">
                                                {
                                                    unit
                                                        .functional_units_expenses?.[0]
                                                        ?.total_amount
                                                }
                                            </div>
                                        </div>
                                        <div className="w-1/3  flex justify-center ">
                                            <div
                                                className={`w-1/2 flex justify-center items-center `}
                                            >
                                                {unit
                                                    .functional_units_expenses?.[0]
                                                    ?.payment_status ===
                                                    "Impago" && (
                                                    <span className=" text-red-500">
                                                        {
                                                            unit
                                                                .functional_units_expenses?.[0]
                                                                ?.payment_status
                                                        }
                                                    </span>
                                                )}
                                                {unit
                                                    .functional_units_expenses?.[0]
                                                    ?.payment_status ===
                                                    "Pagado" && (
                                                    <span className="text-green-500">
                                                        {
                                                            unit
                                                                .functional_units_expenses?.[0]
                                                                ?.payment_status
                                                        }
                                                    </span>
                                                )}
                                                {unit
                                                    .functional_units_expenses?.[0]
                                                    ?.payment_status ===
                                                    "Parcial" && (
                                                    <span className="text-yellow-500">
                                                        {
                                                            unit
                                                                .functional_units_expenses?.[0]
                                                                ?.payment_status
                                                        }
                                                    </span>
                                                )}
                                            </div>

                                            <div className="w-1/2 flex justify-center items-center">
                                                <Link href="#">
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
    );
};
export default Expenses;
