"use client";

import { IConsortium } from "@/Interfaces/Interfaces";
import { ContainerDashboard } from "@/components/ui";
import ContainerHeaderDashboard from "@/components/ui/ContainerHeaderDashboard";
import {
    deleteConsortiumById,
    getConsortiumById,
} from "@/helpers/fetch.helper";
import { formatearNumero } from "@/helpers/functions.helper";
import { useParams, useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import Swal from "sweetalert2";

const page = () => {
    const params: { id: string } = useParams();
    const router = useRouter();
    const [consorcio, setConsorcio] = useState<IConsortium>();
    const [cuit, setCuit] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await getConsortiumById(params.id);
            setConsorcio(response);
        };
        try {
        } catch (error) {
            console.error(error);
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (consorcio) {
            const formatedCuit = formatearNumero(consorcio?.cuit!);
            setCuit(formatedCuit);
        }
    });

    const handleDelete = async () => {
        const response = await deleteConsortiumById(params.id);
        console.log(response);
        if (response?.ok) {
            Swal.fire({
                title: "Consorcio eliminado correctamente",
            });
        }
    };

    const handlePut = () => {
        return;
    };

    return (
        <ContainerDashboard className="flex items-center justify-center w-full h-[93vh] bg-[#e5e7eb]">
            <div className="flex flex-col items-center w-1/2 h-full p-8 m-5  rounded-[50px] justify-evenly border border-slate-100 bg-[#dadada] drop-shadow-2xl shadow-black">
                <div className="w-40 p-2 border rounded-md">
                    <img
                        src="https://i.pinimg.com/564x/47/f2/10/47f2109057d426d054e473fccff5faea.jpg"
                        alt={consorcio?.name}
                        className="rounded-md"
                    />
                </div>
                <div className="flex flex-col w-full h-full gap-2 m-3 ">
                    <h3 className="self-center text-2xl text-fondo">
                        {consorcio?.name}
                    </h3>
                    <p className="px-5 py-4  rounded-[50px] bg-[#e5e7eb] shadow text-fondo border-fondo">
                        CATEGORIA: {consorcio?.category}
                    </p>
                    <p className="px-5 py-4  rounded-[50px] bg-[#e5e7eb] shadow text-fondo border-fondo">
                        DIRECCIÓN: {consorcio?.street_name}{" "}
                        {consorcio?.building_number}, {consorcio?.city} -{" "}
                        {consorcio?.province} - {consorcio?.country}
                    </p>
                    <p className="px-5 py-4  rounded-[50px] bg-[#e5e7eb] shadow text-fondo border-fondo">
                        CUIT: {cuit}
                    </p>
                    <p className="px-5 py-4  rounded-[50px] bg-[#e5e7eb] shadow text-fondo border-fondo">
                        VENCIMIENTO EXPENSAS(dia del mes):{" "}
                        {consorcio?.first_due_day}
                    </p>
                    <p className="px-5 py-4  rounded-[50px] bg-[#e5e7eb] shadow text-fondo border-fondo">
                        PISOS: {consorcio?.floors}
                    </p>
                    <p className="px-5 py-4  rounded-[50px] bg-[#e5e7eb] shadow text-fondo border-fondo">
                        UNIDADES FUNCIONALES: {consorcio?.ufs}
                    </p>
                </div>
                <div className="flex justify-end w-full gap-3 border-black">
                    <button
                        onClick={handlePut}
                        className="p-3 rounded-[50px] bg-fondo hover:bg-slate-50 hover:text-black"
                    >
                        Modificar Info
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-5 rounded-[50px] bg-fondo hover:bg-slate-50 hover:text-black"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </ContainerDashboard>
    );
};

export default page;
