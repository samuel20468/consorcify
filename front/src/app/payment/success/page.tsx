"use client";
import { Button, ContainerDashboard, Title } from "@/components/ui";
import useAuth from "@/helpers/useAuth";
import Link from "next/link";
import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const PaymentSuccess = () => {
    useAuth();

    return (
        <ContainerDashboard className="w-[90%] h-[90vh]">
            <Title>Payment Success</Title>
            <section className="flex flex-col items-center justify-center w-1/2 h-1/2 border rounded-[40px] border-green-500 p-4">
                <IoMdCheckmarkCircleOutline
                    className="text-green-500"
                    size={100}
                />
                <p>Tu pago fue procesado correctamente</p>
                <p>Detalles</p>
            </section>
            <div className="flex w-1/2 justify-around items-center mt-4">
                <Link href="/dashboard">
                    <button className="w-44 py-2 bg-green-500 rounded-[40px] hover:text-black hover:bg-white">
                        Volver al Inicio
                    </button>
                </Link>
                <button className="w-44 py-2 bg-green-500 rounded-[40px] hover:text-black hover:bg-white">
                    Ver detalle
                </button>
            </div>
        </ContainerDashboard>
    );
};

export default PaymentSuccess;
