"use client";

// Estilos y componentes
import { Button, ContainerDashboard, Title } from "@/components/ui";
import Swal from "sweetalert2";

// Interfaces
import { IFunctionalUnits } from "@/Interfaces/functionalUnits.interfaces";

// Endpoints
import { getFuncionalUnits } from "@/helpers/fetch.helper.uf";

// Hooks
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import { getConsortiumById } from "@/helpers/fetch.helper.consortium";
import { IConsortium } from "@/Interfaces/consortium.interfaces";

// --------------------

const AllFunctionalUnits = () => {
    useAuth();
    const { cid }: { cid: string } = useParams();
    const { token } = useSesion();
    const [functionalUnits, setFunctionalUnits] = useState<IFunctionalUnits[]>(
        []
    );
    const [consortiumName, setConsortiumName] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const unitsResponse = await getFuncionalUnits(token, cid);
                if (unitsResponse) {
                    setFunctionalUnits(unitsResponse);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "No se ha podido obtener los datos de las unidades funcionales",
                        confirmButtonText: "Aceptar",
                    });
                }

                const consortiumResponse = await getConsortiumById(cid, token);
                if (consortiumResponse) {
                    const consortiumData: IConsortium =
                        await consortiumResponse.json();
                    setConsortiumName(consortiumData.name);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "No se ha podido obtener los datos del consorcio",
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
    }, [token, cid]);

    return (
        <div className="h-screen">
            <ContainerDashboard>
                <Title>
                    Consorcios{" "}
                    <span className="text-2xl font-thin">
                        | {consortiumName}{" "}
                    </span>
                    <span className="text-xl font-thin">
                        | Unidades Funcionales
                    </span>
                </Title>
                <div className="w-[90%] border-t border-b border-white flex justify-between p-2 mt-5 text-center">
                    <div className="w-1/3 text-xl">Locación</div>
                    <div className="w-1/3 text-xl">Codigo Unidad</div>
                    <div className="w-1/3 text-xl">Propietario</div>
                </div>

                {functionalUnits.length !== 0 ? (
                    functionalUnits.map((unit) => (
                        <div
                            key={unit.id}
                            className="flex justify-between py-5 text-center w-[90%]"
                        >
                            <div className="w-1/3">
                                <h1>{unit.location}</h1>
                            </div>
                            <div className="w-1/3">
                                <h1>{unit.code}</h1>
                            </div>
                            <div className="w-1/3">
                                <h1>{unit.owner}</h1>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-8">
                        <h1 className="text-2xl">No hay Unidades Fucionales</h1>
                    </div>
                )}
            </ContainerDashboard>
        </div>
    );
};

export default AllFunctionalUnits;
