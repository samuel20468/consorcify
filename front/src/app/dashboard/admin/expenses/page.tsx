"use client";

// Estilos y componentes
import { Button, ContainerDashboard, Select, Title } from "@/components/ui";
import ExpenseCards from "@/components/ExpenseCards/ExpenseCards";

// Interfaces
import { IExpense } from "@/Interfaces/expenses.interfaces";
import { IConsortium } from "@/Interfaces/consortium.interfaces";

// Endpoints
import { getExpensesByConsorcioId } from "@/helpers/fetch.helper.expense";
import { getConsortiumsByAdminId } from "@/helpers/fetch.helper.consortium";

// Hooks
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import Link from "next/link";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { CgArrowAlignV } from "react-icons/cg";

// --------------------

const Expense = () => {
    useAuth();
    const { token, data } = useSesion();
    const [expensas, setExpensas] = useState<IExpense[]>([]);
    const [consortiums, setConsortiums] = useState<IConsortium[]>([]);
    const pathname = usePathname();
    const [selectedConsortiumId, setSelectedConsortiumId] = useState<
        string | null
    >(null);
    const [sortConfig, setSortConfig] = useState<{
        field: keyof IExpense;
        order: "asc" | "desc";
    } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getConsortiumsByAdminId(data.id, token);
                if (response) {
                    const data = await response.json();
                    setConsortiums(data);
                    if (data.length > 0) {
                        setSelectedConsortiumId(data[0].id);
                    }
                }
            } catch (error: any) {
                console.error(error.message);
            }
        };
        if (token) {
            fetchData();
        }
    }, [token, pathname, data]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getExpensesByConsorcioId(
                    token,
                    selectedConsortiumId!
                );
                if (response) {
                    const data = await response.json();
                    setExpensas(data);
                }
            } catch (error: any) {
                console.error(error.message);
            }
        };
        if (token) {
            fetchData();
        }
    }, [selectedConsortiumId, token]);

    // Filtros

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedConsortiumId(event.target.value);
    };

    const selectedConsortium = consortiums.find(
        (c) => c.id === selectedConsortiumId
    );

    const handleHeaderClick = (field: keyof IExpense) => {
        let order: "asc" | "desc" = "asc";
        if (
            sortConfig &&
            sortConfig.field === field &&
            sortConfig.order === "asc"
        ) {
            order = "desc";
        }
        setSortConfig({ field, order });
        handleSort(field, order);
    };

    const handleSort = (field: keyof IExpense, order: "asc" | "desc") => {
        const sortedData = [...expensas].sort((a, b) => {
            const valueA = a[field];
            const valueB = b[field];
            if (typeof valueA === "string" && typeof valueB === "string") {
                return order === "asc"
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            } else if (
                typeof valueA === "number" &&
                typeof valueB === "number"
            ) {
                return order === "asc" ? valueA - valueB : valueB - valueA;
            } else {
                return 0;
            }
        });
        setExpensas(sortedData);
    };

    return (
        <div className="h-screen">
            <ContainerDashboard>
                <Title>Expensas</Title>
                <div className="flex items-center justify-between w-[98%]">
                    <div className="w-2/3">
                        <Select
                            id="consortium_id"
                            name="consortium_id"
                            className="w-1/3 h-10 px-2 my-1 text-gray-200 rounded-md shadow-xl cursor-pointer bg-input focus:outline-none no-spinners"
                            value={selectedConsortiumId || ""}
                            onChange={handleSelectChange}
                        >
                            {consortiums.length > 0 &&
                                consortiums.map((consortium) => (
                                    <option
                                        value={consortium.id}
                                        key={consortium.id}
                                    >
                                        {consortium.name}
                                    </option>
                                ))}
                        </Select>
                    </div>
                    <div className="flex w-1/3">
                        <Link
                            className="flex justify-end w-full mr-5"
                            href="/dashboard/admin/expenses/addexpense"
                        >
                            <Button className="w-1/2 p-2 rounded-[40px]">
                                Nueva Expensa
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="w-[90%] border-t border-b border-white flex justify-between p-2 mt-5 text-center">
                    <h1
                        className="flex items-center justify-center w-1/5 text-xl cursor-pointer"
                        onClick={() => handleHeaderClick("name")}
                    >
                        Expensa{" "}
                        {sortConfig?.field === "name" &&
                            (sortConfig.order === "asc" ? (
                                <IoIosArrowUp />
                            ) : (
                                <IoIosArrowDown />
                            ))}
                        {sortConfig?.field !== "name" && (
                            <CgArrowAlignV className="w-4 h-4 ml-1 opacity-1" />
                        )}
                    </h1>
                    <h1
                        className="flex items-center justify-center w-1/5 text-xl cursor-pointer"
                        onClick={() => handleHeaderClick("issue_date")}
                    >
                        Fecha de inicio{" "}
                        {sortConfig?.field === "issue_date" &&
                            (sortConfig.order === "asc" ? (
                                <IoIosArrowUp />
                            ) : (
                                <IoIosArrowDown />
                            ))}
                        {sortConfig?.field !== "issue_date" && (
                            <CgArrowAlignV className="w-4 h-4 ml-1 opacity-1" />
                        )}
                    </h1>
                    <h1
                        className="flex items-center justify-center w-1/5 text-xl cursor-pointer"
                        onClick={() => handleHeaderClick("expiration_date")}
                    >
                        Fecha de cierre{" "}
                        {sortConfig?.field === "expiration_date" &&
                            (sortConfig.order === "asc" ? (
                                <IoIosArrowUp />
                            ) : (
                                <IoIosArrowDown />
                            ))}
                        {sortConfig?.field !== "expiration_date" && (
                            <CgArrowAlignV className="w-4 h-4 ml-1 opacity-1" />
                        )}
                    </h1>
                    <h1
                        className="flex items-center justify-center w-1/5 text-xl cursor-pointer"
                        onClick={() => handleHeaderClick("status")}
                    >
                        Estado{" "}
                        {sortConfig?.field === "status" &&
                            (sortConfig.order === "asc" ? (
                                <IoIosArrowUp />
                            ) : (
                                <IoIosArrowDown />
                            ))}
                        {sortConfig?.field !== "status" && (
                            <CgArrowAlignV className="w-4 h-4 ml-1 opacity-1" />
                        )}
                    </h1>
                    <h1
                        className="flex items-center justify-center w-1/5 text-xl cursor-pointer"
                        onClick={() => handleHeaderClick("total_amount")}
                    >
                        Total expensas{" "}
                        {sortConfig?.field === "total_amount" &&
                            (sortConfig.order === "asc" ? (
                                <IoIosArrowUp />
                            ) : (
                                <IoIosArrowDown />
                            ))}
                        {sortConfig?.field !== "total_amount" && (
                            <CgArrowAlignV className="w-4 h-4 ml-1 opacity-1" />
                        )}
                    </h1>{" "}
                </div>
                {expensas.length > 0 ? (
                    <ExpenseCards expenses={expensas} />
                ) : (
                    <div className="p-8">
                        <h1 className="text-2xl">
                            No hay expensas para visualizar
                        </h1>
                    </div>
                )}
            </ContainerDashboard>
        </div>
    );
};

export default Expense;
