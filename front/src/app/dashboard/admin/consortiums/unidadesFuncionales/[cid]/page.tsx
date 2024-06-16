"use client";
import { IFunctionalUnits } from "@/Interfaces/functionalUnits.interfaces";
import { Button, ContainerDashboard, Title } from "@/components/ui";
import { getFuncionalUnits } from "@/helpers/fetch.helper.uf";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import Swal from "sweetalert2";

const AllFunctionalUnits = () => {
    useAuth();
    const { cid }: { cid: string } = useParams();
    const { token, data } = useSesion();
    const [functionalUnits, setFunctionalUnits] = React.useState<
        IFunctionalUnits[]
    >([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getFuncionalUnits(token, cid);
                if (response) {
                    setFunctionalUnits(response);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "No se ha podido obtener los datos",
                        confirmButtonText: "Aceptar",
                    });
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fetchData();
        }
    }, [token]);

    return (
        <ContainerDashboard className="w-[90%] h-[85vh]">
            <Title>All Functional Units</Title>
            <div className="w-[90%] flex justify-end items-center py-1">
                <Link href={`/dashboard/admin/consortiums/${cid}`}>
                    <Button className="w-32 py-2 rounded-[40px]">Volver</Button>
                </Link>
            </div>
            <div className="w-[90%] h-[75vh] border rounded-[40px] flex  items-center flex-col">
                <div className="h-[10%] w-[90%] border-b flex items-center justify-between">
                    <div className="w-1/3 flex justify-center">Locación</div>
                    <div className="w-1/3 flex justify-center">
                        Codigo Unidad
                    </div>
                    <div className="w-1/3 flex justify-center">Propietario</div>
                </div>
                <div className="w-[90%] h-[70%] flex flex-col items-center ">
                    {functionalUnits.length !== 0 ? (
                        functionalUnits.map((unit) => (
                            <div
                                key={unit.id}
                                className="h-auto w-full flex items-center py-2"
                            >
                                <div className="w-full h-1/3 flex justify-center">
                                    {unit.location}
                                </div>
                                <div className="w-full h-1/3 flex justify-center">
                                    {unit.code}
                                </div>
                                <div className="w-full h-1/3 flex justify-center">
                                    {unit.owner}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No hay Unidades Fucionales</div>
                    )}
                </div>
            </div>
        </ContainerDashboard>
    );
};

export default AllFunctionalUnits;
