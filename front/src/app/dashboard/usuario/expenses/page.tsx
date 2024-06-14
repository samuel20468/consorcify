"use client";
import { RxCross1 } from "react-icons/rx";
import { IoCheckmarkOutline } from "react-icons/io5";
import { IFunctionalUnits } from "@/Interfaces/functionalUnits.interfaces";
import { IUser } from "@/Interfaces/user.interfaces";
import { Button, ContainerDashboard, Select } from "@/components/ui";
import { paymentCheckOut } from "@/helpers/fetch.helper";
import {
    functionalUnitExpensesId,
    getFuncionalUnitByID,
    getFuncionalUnitByUser,
} from "@/helpers/fetch.helper.uf";
import { getUserById } from "@/helpers/fetch.helper.user";
import {
    AccountBalance,
    ArrowBack,
    Cross,
    Home,
    HomeTwo,
    Stroke,
} from "@/helpers/icons.helper";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Expenses = () => {
    useAuth();
    const path = usePathname();
    const { token, data } = useSesion();
    const [user, setUser] = useState<IUser>();
    const [functionalUnit, setFunctionalUnit] = useState<IFunctionalUnits[]>(
        []
    );
    const [expenses, setExpenses] = useState<any[]>();
    const [id, setId] = useState<string>("");

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
            try {
                const response = await functionalUnitExpensesId(id!, token);
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
        if (token) {
            fechtExpenses();
        }
    }, [token]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setId(value);
    };

    return (
        <div>
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
                                {expenses?.reduce(
                                    (acc, expense) =>
                                        acc + expense.total_amount,
                                    0
                                )}
                            </p>
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
                            <p className="flex items-center justify-center w-full h-1/4">
                                <Select
                                    onChange={handleChange}
                                    value={id}
                                    name="id"
                                    id="id"
                                >
                                    {functionalUnit?.map((unit) => (
                                        <option
                                            value={unit.id}
                                            key={unit.id}
                                            selected={id !== ""}
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
                                <div className="w-1/3  flex "></div>
                            </div>
                            {expenses?.map((expense, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex  w-full gap-2"
                                    >
                                        <div className="w-2/3 border flex py-2">
                                            <div className="w-1/3 flex justify-center">
                                                {
                                                    expense.expense.expiration_date.split(
                                                        "-"
                                                    )[0]
                                                }
                                            </div>
                                            <div className="w-1/3 flex justify-center">
                                                {
                                                    expense.expense.expiration_date.split(
                                                        "-"
                                                    )[1]
                                                }
                                            </div>
                                            <div className="w-1/3 flex justify-center">
                                                ${expense.total_amount}
                                            </div>
                                        </div>
                                        <div className="w-1/3 border flex ">
                                            <div className="w-1/2 flex justify-center items-center">
                                                <RxCross1 className="text-red-500" />
                                                <IoCheckmarkOutline className="text-green-500" />
                                            </div>
                                            <div className="w-1/2 flex justify-center items-center p-1">
                                                <Link
                                                    href={`/dashboard/usuario/expenses/${expense.id}`}
                                                >
                                                    <Button className="w-32 rounded-[40px]">
                                                        Pagar
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </ContainerDashboard>
        </div>
    );
};
export default Expenses;
