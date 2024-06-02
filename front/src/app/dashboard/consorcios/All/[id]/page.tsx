"use client";

import { IConsortium } from "@/Interfaces/Interfaces";
import { ContainerDashboard } from "@/components/ui";
import ContainerHeaderDashboard from "@/components/ui/ContainerHeaderDashboard";
import { getConsortiumById } from "@/helpers/fetch.helper";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
    const params: { id: string } = useParams();
    const [consorcio, setConsorcio] = useState<IConsortium>();

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

    const handleDelete = () => {
        alert("Esta funcion va a eliminar un consorcio");
        return;
    };

    const handlePut = () => {
        alert("esta funcion va a modificar el consorcio");
        return;
    };

    return (
        <ContainerDashboard className="items-center justify-center h-[80vh]">
            {/* //! Vista de  */}
            <div className="flex flex-col items-center justify-between w-1/2 h-full p-8 border rounded-md">
                <div className="w-40 p-5 border">
                    <img
                        src="https://i.pinimg.com/564x/47/f2/10/47f2109057d426d054e473fccff5faea.jpg"
                        alt={consorcio?.name}
                    />
                </div>
                <div className="flex flex-col h-full">
                    <h3 className="self-center">{consorcio?.name}</h3>
                    <p>CATEGORIA: {consorcio?.category}</p>
                    <p>
                        DIRECCIÓN: {consorcio?.street_name}{" "}
                        {consorcio?.building_number}, {consorcio?.city} -{" "}
                        {consorcio?.province} - {consorcio?.country}
                    </p>
                    <p>CUIT: {consorcio?.cuit}</p>
                </div>
            </div>
            <div className="flex gap-3 my-3 ">
                <button onClick={handlePut} className="p-3 rounded-lg ">
                    Modificar Info
                </button>
                <button
                    onClick={handleDelete}
                    className="p-3 rounded-lg hover:bg-slate-50 hover:text-black"
                >
                    Eliminar
                </button>
            </div>
        </ContainerDashboard>
    );
};

export default page;
