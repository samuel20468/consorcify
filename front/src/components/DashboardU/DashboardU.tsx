"use client";
import { AccountBalance, Home } from "@/helpers/icons.helper";
import { Button, ContainerDashboard, Select } from "../ui";
import Link from "next/link";
import { useEffect, useState } from "react";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import { useRouter } from "next/navigation";
import { useUfSesion } from "@/helpers/useUfSesion";

const DashboardU = () => {
    useAuth();
    const router = useRouter();
    const { token, data } = useSesion();
    const { haveUF, isLoading, functional_unit } = useUfSesion();
    const [uf, setUf] = useState<string>("");

    useEffect(() => {
        if (!isLoading && !haveUF) {
            router.push("/dashboard/usuario/addfuncionalunit");
        }
    }, [isLoading, haveUF, router]);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    const handleChange = (e: any) => {
        setUf(e.target.value);
    };

    return (
        <ContainerDashboard className="w-[90%] h-[90vh] justify-center p-5">
            <div className="flex items-center justify-center w-full gap-2 mt-2 h-1/3">
                <div className="flex items-center justify-center  w-full h-full border rounded-[40px] bg-gradient-to-r from-neutral-50 via-fondo to-fondo">
                    <div className="flex items-center justify-center w-full h-full">
                        <AccountBalance className="w-10 text-black" />
                    </div>
                    <div className="flex flex-col items-center justify-center w-full h-full text-xl text-white">
                        <p className="flex items-center justify-center w-full h-1/4">
                            Saldo
                        </p>
                        <p className="flex items-center justify-center w-full h-1/4">
                            Acá va el saldo del inquilino
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center  w-full h-full border rounded-[40px] bg-gradient-to-r from-neutral-50 via-fondo to-fondo">
                    <div className="flex items-center justify-center w-full h-full">
                        <Link
                            className="flex items-center justify-center w-full h-full"
                            href="/dashboard/usuario/information/UF"
                        >
                            <Home className="w-10 text-black" />
                        </Link>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full h-full text-xl text-white">
                        <p className="flex items-center justify-center w-full h-1/4">
                            Unidad Funcional
                        </p>
                        <p className="flex items-center justify-center h-1/4 w-auto">
                            {functional_unit.length > 0 ? (
                                <Select
                                    name="uf"
                                    id="uf"
                                    onChange={handleChange}
                                >
                                    {functional_unit.map((uf) => (
                                        <option key={uf.id} value={uf.id}>
                                            {uf.location}
                                        </option>
                                    ))}
                                </Select>
                            ) : (
                                "No hay UF"
                            )}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center   rounded-[40px] mt-2 w-full h-1/3 items-center">
                <div className="flex border rounded-[40px] w-3/4 h-1/3 items-center justify-between p-5">
                    <Button className=" w-32 rounded-[40px] py-2">Pagar</Button>
                    <Button className=" w-32 rounded-[40px] py-2">
                        <Link
                            className="w-full"
                            href={"/dashboard/usuario/expenses"}
                        >
                            Expensas
                        </Link>
                    </Button>
                    <Button className=" w-32 rounded-[40px] py-2">
                        Amenities
                    </Button>
                </div>
            </div>
            <div className="flex items-center justify-center w-full gap-2 mt-2 h-1/3">
                <div className="flex flex-col p-5 w-full h-full justify-around gap-2 border rounded-[40px]">
                    <div className="flex items-center justify-center rounded-[40px] w-full h-16 text-black bg-neutral-50">
                        Mora Total Unidades
                    </div>
                    <div className="flex items-center justify-center h-full border rounded-[40px]">
                        Acá va la información pertinente
                    </div>
                </div>
                <div className="flex flex-col p-5 w-full h-full justify-around gap-2 border rounded-[40px]">
                    <div className="flex items-center justify-center rounded-[40px] w-full h-16 text-black bg-neutral-50">
                        Dinero en Cuenta
                    </div>
                    <div className="flex items-center justify-center h-full border rounded-[40px]">
                        Acá va la información pertinente
                    </div>
                </div>
                <div className="flex flex-col p-5 w-full h-full justify-around gap-2 border rounded-[40px]">
                    <div className="flex items-center justify-center rounded-[40px] w-full h-16 text-black bg-neutral-50">
                        Gastos Expensas
                    </div>
                    <div className="flex items-center justify-center h-full border rounded-[40px]">
                        Acá va la información pertinente
                    </div>
                </div>
                <div className="flex flex-col p-5 w-full h-full justify-around gap-2 border rounded-[40px]">
                    <div className="flex items-center justify-center rounded-[40px] w-full h-16 text-black bg-neutral-50">
                        C/C Consorcio
                    </div>
                    <div className="flex items-center justify-center h-full border rounded-[40px]">
                        Acá va la información pertinente
                    </div>
                </div>
            </div>
        </ContainerDashboard>
    );
};

export default DashboardU;
