"use client";
import React, { InputHTMLAttributes, useEffect, useState } from "react";
import { Button, Input, Label } from "../ui";
import { IConsortium, INewExpense } from "@/Interfaces/Interfaces";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import { getConsortiums, newExpense } from "@/helpers/fetch.helper";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentDate } from "@/helpers/functions.helper";
import { validateForm } from "@/helpers/Validations/vallidate.expense";
import { Span } from "next/dist/trace";
import { error } from "console";
import Swal from "sweetalert2";
import exp from "constants";

const addExpenses = () => {
    useAuth();
    const path = usePathname();
    const router = useRouter();
    const { token, data } = useSesion();
    const initialData = {
        issue_date: getCurrentDate(),
        expiration_date: "",
        consortium_id: "",
    };
    const [expense, setExpense] = useState<INewExpense>(initialData);
    const [errors, setErrors] = useState<INewExpense>(initialData);
    const [consortiums, setconsortiums] = useState<IConsortium[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getConsortiums(token);
                if (response) {
                    setconsortiums(response);
                }
            } catch (error) {}
        };
        if (token) {
            fetchData();
        }
    }, [token, path]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setExpense((prevExpense) => ({
            ...prevExpense,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!expense.expiration_date || !expense.consortium_id) {
            Swal.fire({
                icon: "error",
                title: "Por favor completa todos los campos",
            });
            return;
        }

        try {
            const response = await newExpense(token, expense);
            if (response) {
                Swal.fire({
                    icon: "success",
                    title: "Expensa creada correctamente",
                }).then((resp) => {
                    if (resp.isConfirmed) {
                        router.push("/dashboard/admin/expenses");
                    } else {
                        Swal.fire({
                            icon: "warning",
                            title: "Hubo error al crear la Expensa",
                            text: "Intentato mas trade",
                        });
                        return;
                    }
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const errors = validateForm(expense);
        setErrors(errors);
    }, [expense]);

    console.log(expense);

    return (
        <div className="flex flex-col w-full items-center justify-center p-8 h-1/2">
            <div className="p-3">
                <h3 className="text-2xl">Nueva Expensa</h3>
            </div>
            <form
                className="w-1/2 flex flex-col items-center justify-between h-full  p-8 rounded-[40px] border border-black"
                onSubmit={handleSubmit}
            >
                <div className="w-full flex flex-col">
                    <div className="w-full flex justify-between">
                        <Label className="w-full">Fecha de Vencimiento</Label>
                        {errors.expiration_date && (
                            <span className="w-full flex items-center justify-center">
                                {errors.expiration_date}
                            </span>
                        )}
                    </div>
                    <Input
                        type="date"
                        name="expiration_date"
                        id="expiration_date"
                        min={getCurrentDate()}
                        value={expense.expiration_date}
                        onChange={handleChange}
                    />
                    <div className="w-full flex flex-col">
                        <Label className="w-full">Consorcio</Label>
                        <select
                            value={expense.consortium_id}
                            onChange={handleChange}
                            name="consortium_id"
                            id="consortium_id"
                            className="w-full h-10 p-2 my-1 text-gray-200 rounded-md shadow-xl bg-input placeholder:font-extralight placeholder:text-gray-500 focus:outline-none no-spinners"
                        >
                            <option value="">Elija un Consorcio</option>
                            {consortiums.length !== 0 &&
                                consortiums.map((consortium) => (
                                    <option
                                        key={consortium.id}
                                        value={consortium.id}
                                    >
                                        {consortium.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
                <div className="w-full">
                    <Button
                        type="submit"
                        className="w-full py-2 rounded-[40px]"
                    >
                        Crear Expensa
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default addExpenses;
