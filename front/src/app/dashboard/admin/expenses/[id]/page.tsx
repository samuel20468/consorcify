"use client";
import { IExpense } from "@/Interfaces/Interfaces";
import { Button, ContainerDashboard, Title } from "@/components/ui";
import {
    closeExpense,
    getExpensesById,
    settleExpense,
} from "@/helpers/fetch.helper";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Page = () => {
    useAuth();
    const router = useRouter();
    const path = usePathname();
    const { token, data } = useSesion();
    const { id }: { id: string } = useParams();
    const [expensa, setExpensa] = useState<IExpense>();

    useEffect(() => {
        const fecthData = async () => {
            try {
                const response = await getExpensesById(token, id);
                console.log(response);
                if (response) {
                    setExpensa(response);
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
                } catch (error) {}
            }
        });
    };

    return (
        <ContainerDashboard className="w-[90%] h-[90vh]">
            {expensa && (
                <Title>
                    <p className="w-1/2">
                        Expensas - {expensa?.consortium.name}
                    </p>
                </Title>
            )}

            {expensa ? (
                <div className="w-[90%] h-full flex flex-col">
                    <div className="w-full flex justify-end">
                        <Link href="/dashboard/admin/expenses">
                            <Button className="w-32 py-2 rounded-[40px] text-sm">
                                Volver
                            </Button>
                        </Link>
                    </div>

                    <div
                        className="w-full h-auto
                    flex justify-center py-2"
                    >
                        <p className="w-1/4 flex items-center justify-center">
                            Fecha
                        </p>
                        <p className="w-1/4 flex items-center justify-center">
                            Descripción
                        </p>
                        <p className="w-1/4 flex items-center justify-center">
                            Categoría
                        </p>
                        <p className="w-1/4 flex items-center justify-center">
                            Total
                        </p>
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
                                <p className="w-1/4 flex items-center justify-center">
                                    {expenditure.date}
                                </p>
                                <p className="w-1/4 flex items-center justify-center">
                                    {expenditure.description}
                                </p>
                                <p className="w-1/4 flex items-center justify-center">
                                    {expenditure.category}
                                </p>
                                <p className="w-1/4 flex items-center justify-center">
                                    {expenditure.total_amount}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="flex w-full justify-end py-2 gap-2 items-center">
                        <div className="w-1/4 flex justify-end items-center">
                            TOTAL ${expensa.total_amount}
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
                // Renderizar un indicador de carga mientras se carga la información de la expensa
                <p className="h-full w-full items-center justify-center">
                    Cargando...
                </p>
            )}
        </ContainerDashboard>
    );
};
export default Page;
