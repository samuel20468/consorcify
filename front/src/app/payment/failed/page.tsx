"use client";
import { Button, ContainerDashboard, Title } from "@/components/ui";
import useAuth from "@/helpers/useAuth";
import Link from "next/link";
import React from "react";
import { BiErrorCircle } from "react-icons/bi";
const PaymentSuccess = () => {
  useAuth();
  return (
    <ContainerDashboard className="w-[90%] h-[90vh]">
      <Title>Payment Failed</Title>
      <section className="flex flex-col items-center justify-center w-1/2 h-1/2 border rounded-[40px] border-redd p-4">
        <BiErrorCircle className="text-redd" size={100} />
        <p>Hubo un error al procesar tu pago</p>
      </section>
      <div className="flex items-center justify-around w-1/2 mt-4">
        <Link href="/dashboard">
          <button className="w-44 py-2 bg-redd rounded-[40px] hover:text-black hover:bg-white">
            Volver al Inicio
          </button>
        </Link>
        <button className="w-44 py-2 bg-redd rounded-[40px] hover:text-black hover:bg-white">
          Ver detalle
        </button>
      </div>
    </ContainerDashboard>
  );
};

export default PaymentSuccess;
