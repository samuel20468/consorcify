"use client";
import { Button, ContainerDashboard } from "@/components/ui";
import { paymentCheckOut } from "@/helpers/fetch.helper";
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

const Expenses = () => {
  useAuth();
  const { token } = useSesion();
  const handlePay = async () => {
    try {
      const idPrueba = "951db13b-317d-4eb4-bb57-ea71970c6fb9";
      const response = await paymentCheckOut(token, idPrueba);
      if (response?.ok) {
        const { url } = await response.json();
        window.location.href = url;
      }
    } catch (error) {
      console.error(error);
    }
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
            Nombre del consorcio y de la unidad funcional
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
              <p className="flex items-center justify-center w-full h-1/4">
                Acá va el saldo del inquilino
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center w-1/2 h-full border rounded-[40px] gap-2 bg-gradient-to-r from-neutral-50 via-fondo to-fondo">
            <div className="flex items-center justify-center w-full h-full itc">
              <HomeTwo className="" />
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full itc">
              <p className="flex items-center justify-center w-full h-1/4">
                Unidad Funcional
              </p>
              <p className="flex items-center justify-center w-full h-1/4">
                Nombre de la UF
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col border rounded-[40px] h-[75%] w-full ">
          <div className="flex items-center px-10 w-[98%] h-[10%] border-b-2 self-center">
            <p>Historial de expensas</p>
          </div>
          <div className="w-full h-[15%] flex gap-1 p-3">
            <Button className="flex items-center justify-center w-32 rounded-[40px] py-8">
              2020
            </Button>
            <Button className="flex items-center justify-center w-32 rounded-[40px] py-8">
              2021
            </Button>
            <Button className="flex items-center justify-center w-32 rounded-[40px] py-8">
              2022
            </Button>
            <Button className="flex items-center justify-center w-32 rounded-[40px] py-8">
              2023
            </Button>
            <Button className="flex items-center justify-center w-32 rounded-[40px] py-8">
              2024
            </Button>
          </div>
          <div className="flex flex-col w-full h-[75%] p-5 gap-2">
            <div className="flex w-full h-1/4 border rounded-[40px]">
              <div className="flex items-center justify-center w-1/2 h-full gap-2">
                <p className="flex items-center justify-center w-1/3">Junio</p>
                <p className="flex items-center justify-center w-1/3">
                  $ 35.000
                </p>
                <p className="flex items-center justify-center w-1/3">10</p>
              </div>
              <div className="flex w-1/2">
                <div className="flex items-center justify-end w-full gap-2 p-5">
                  <Cross />
                  <Button
                    className="w-32 py-3 rounded-[40px]"
                    onClick={handlePay}
                  >
                    Pagar
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex w-full h-1/4 border rounded-[40px]">
              <div className="flex items-center justify-center w-1/2 h-full gap-2">
                <p className="flex items-center justify-center w-1/3">mes</p>
                <p className="flex items-center justify-center w-1/3">monto</p>
                <p className="flex items-center justify-center w-1/3">
                  vencimiento
                </p>
              </div>
              <div className="flex w-1/2">
                <div className="flex items-center justify-end w-full p-5">
                  <Stroke />
                </div>
              </div>
            </div>
            <div className="flex w-full h-1/4 border rounded-[40px]">
              <div className="flex items-center justify-center w-1/2 h-full gap-2">
                <p className="flex items-center justify-center w-1/3">mes</p>
                <p className="flex items-center justify-center w-1/3">monto</p>
                <p className="flex items-center justify-center w-1/3">
                  vencimiento
                </p>
              </div>
              <div className="flex w-1/2">
                <div className="flex items-center justify-end w-full p-5">
                  <Stroke />
                </div>
              </div>
            </div>
            <div className="flex w-full h-1/4 border rounded-[40px]">
              <div className="flex items-center justify-center w-1/2 h-full gap-2">
                <p className="flex items-center justify-center w-1/3">mes</p>
                <p className="flex items-center justify-center w-1/3">monto</p>
                <p className="flex items-center justify-center w-1/3">
                  vencimiento
                </p>
              </div>
              <div className="flex items-center w-1/2">
                <div className="flex items-center justify-end w-full p-5">
                  <Stroke />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContainerDashboard>
    </div>
  );
};
export default Expenses;
