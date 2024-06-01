"use client";
import { getConsortiumById } from "@/helpers/fetch.helper";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
    const params: { id: string } = useParams();
    const [consorcio, setConsorcio] = useState();

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
        <div className="flex flex-col items-center justify-center w-full h-screen bg-white">
            <div className="flex flex-col w-1/2 p-8 rounded bg-slate-200 ">
                <h3>{consorcio?.name}</h3>
                <p>{`
                    CUIT: ${consorcio?.cuit} \t
                    
                    DIRECCION: ${consorcio?.street_name}, ${consorcio?.building_number}
                `}</p>
            </div>
            <div className="flex gap-3 my-3 ">
                <button
                    onClick={handlePut}
                    className="p-3 rounded-lg bg-slate-100"
                >
                    Modificar Info
                </button>
                <button
                    onClick={handleDelete}
                    className="p-3 rounded-lg bg-slate-100"
                >
                    Eliminar
                </button>
                <Link
                    href={"/dashboard/consorcios/All"}
                    className="p-3 rounded-lg bg-slate-100"
                >
                    Volver
                </Link>
            </div>
        </div>
    );
};

export default page;
