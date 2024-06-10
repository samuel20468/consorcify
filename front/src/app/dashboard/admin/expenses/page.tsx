"use client";

import { IExpense } from "@/Interfaces/Interfaces";
import SearchBar from "@/components/SearchBar/SearchBar";
import AddExpenses from "@/components/addExpenses/addExpenses";
// Estilos y componentes
import { Button, ContainerDashboard, Title } from "@/components/ui";
import { FaPlus } from "react-icons/fa6";

// Hooks
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getExpenses } from "@/helpers/fetch.helper";
import { usePathname } from "next/navigation";

// --------------------

const Expense = () => {
    useAuth();
    const { token, data } = useSesion();
    const [expensas, setExpensas] = useState<IExpense[]>([]);
    const [result, setResult] = useState<IExpense[]>([]);
    const pathname = usePathname();

    const handleSearch = (query: string) => {
        const trimmedQuery = query.trim().toLocaleLowerCase();

        if (!trimmedQuery) {
            setResult(expensas || []);
            return;
        }

        const filteredData = (expensas || []).filter((consortium: IExpense) => {
            return Object.values(consortium).some((value) => {
                return (
                    typeof value === "string" &&
                    value.toLocaleLowerCase().includes(trimmedQuery)
                );
            });
        });

        setResult(filteredData);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getExpenses(token);
                if (response) {
                    const data = await response.json();
                    setExpensas(data);
                    setResult(data);
                }
            } catch (error) {}
        };
        if (token) {
            fetchData();
        }
    }, [token, pathname]);

    return (
        <ContainerDashboard className="h-[90vh] text-black bg-gray-100 w-[90%] gap-3">
            <Title>Expensas</Title>
            <div className="w-[90%] flex justify-between">
                <SearchBar onSearch={handleSearch} />
                <Link href="/dashboard/admin/expenses/addexpense">
                    <Button className="w-40 items-center justify-around py-2 rounded-[40px] flex">
                        Nueva Expensa
                        <FaPlus />
                    </Button>
                </Link>
            </div>
            <div className="w-[90%] boder rounded">
                <div className="w-full flex justify-around">
                    <p className=" w-1/5 flex items-center justify-center border-b border-black">
                        Fecha de inicio
                    </p>
                    <p className=" w-1/5 flex items-center justify-center border-b border-black">
                        Fecha de Vencimiento
                    </p>
                    <p className=" w-1/5 flex items-center justify-center border-b border-black">
                        Total Expensas
                    </p>
                    <p className=" w-1/5 flex items-center justify-center border-b border-black">
                        Estado
                    </p>
                    <p className=" w-1/5 flex items-center justify-center border-b border-black">
                        Consorcio
                    </p>
                </div>
                <div className="w-full h-full">
                    {result.length > 0 ? (
                        result.map((expensa) => (
                            <Link
                                href={`/dashboard/admin/expenses/${expensa.id}`}
                                key={expensa.id}
                            >
                                <div className="w-full flex justify-around my-2 border py-2 rounded-[40px] border-black">
                                    <p className="flex items-center justify-center w-1/5">
                                        {expensa.issue_date}
                                    </p>
                                    <p className="flex items-center justify-center w-1/5">
                                        {expensa.expiration_date}
                                    </p>
                                    <p className="flex items-center justify-center w-1/5">
                                        {expensa.total_amount}
                                    </p>
                                    <p className="flex items-center justify-center w-1/5">
                                        {expensa.status}
                                    </p>
                                    <p className="flex items-center justify-center w-1/5">
                                        {expensa.consortium.name}
                                    </p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="w-full h-[30vh] flex justify-center items-center ">
                            <p className="flex justify-center items-center w-full h-3/4 text-2xl">
                                {expensas.length === 0
                                    ? "No hay expensas para visualizar"
                                    : "No se encontraron coincidencias"}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </ContainerDashboard>
    );
};

export default Expense;
