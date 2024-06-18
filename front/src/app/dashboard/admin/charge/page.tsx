"use client";

// Estilos y componentes
import { ContainerDashboard, Select, Title } from "@/components/ui";
import { getConsortiumsByAdminId } from "@/helpers/fetch.helper.consortium";
import { formatMoney } from "@/helpers/functions.helper";

// Endpoints
import { getFuncionalUnits } from "@/helpers/fetch.helper.uf";

// Interfaces
import { IConsortium } from "@/Interfaces/consortium.interfaces";
import { IFunctionalUnits } from "@/Interfaces/functionalUnits.interfaces";

// Hooks
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";

// ------------------

const Charge = () => {
    useAuth();
    const { token, data } = useSesion();
    const pathname = usePathname();
    const [consortiums, setConsortiums] = useState<IConsortium[]>([]);
    const [selectedConsortiumId, setSelectedConsortiumId] = useState<
        string | null
    >(null);
    const [functionalUnits, setFunctionalUnits] = useState<IFunctionalUnits[]>(
        []
    );

    useEffect(() => {
        const fetchConsortiums = async () => {
            try {
                const response = await getConsortiumsByAdminId(data.id, token);
                if (response) {
                    const data = await response.json();
                    setConsortiums(data);
                    if (data.length > 0) {
                        setSelectedConsortiumId(data[0].id);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fetchConsortiums();
        }
    }, [token, pathname]);

    useEffect(() => {
        const fetchFunctionalUnits = async () => {
            try {
                if (selectedConsortiumId) {
                    const response = await getFuncionalUnits(
                        token,
                        selectedConsortiumId
                    );
                    if (response) {
                        setFunctionalUnits(response);
                    }
                }
            } catch (error: any) {
                console.error(error.message);
            }
        };
        if (token && selectedConsortiumId) {
            fetchFunctionalUnits();
        }
    }, [token, selectedConsortiumId]);

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedConsortiumId(event.target.value);
        setFunctionalUnits([]);
    };

    return (
        <div className="h-screen">
            <ContainerDashboard>
                <Title>Cobranzas</Title>
                <div className="flex items-center justify-between w-[98%]">
                    <div className="w-2/3">
                        <Select
                            id="consortium_id"
                            name="consortium_id"
                            className="w-1/3 h-10 px-2 my-1 text-gray-200 rounded-md shadow-xl cursor-pointer bg-input focus:outline-none no-spinners"
                            value={selectedConsortiumId || ""}
                            onChange={handleSelectChange}
                        >
                            {consortiums.length > 0 &&
                                consortiums.map((consortium) => (
                                    <option
                                        value={consortium.id}
                                        key={consortium.id}
                                    >
                                        {consortium.name}
                                    </option>
                                ))}
                        </Select>
                    </div>
                </div>
                <div className="w-[90%] border-t border-b border-white flex justify-between p-2 mt-5 text-center">
                    <h1 className="w-1/4 text-xl">Piso / Unidad Funcional</h1>
                    <h1 className="w-1/4 text-xl">Propietario</h1>
                    <h1 className="w-1/4 text-xl">Inquilino</h1>
                    <h1 className="w-1/4 text-xl">Deuda</h1>
                </div>
                <div className="flex flex-col justify-center gap-5 py-5 w-[90%]">
                    {functionalUnits.length > 0 ? (
                        functionalUnits.map((unit) => (
                            <div
                                key={unit.id}
                                className="flex justify-between py-2 text-center text-black bg-gray-200 rounded-lg"
                            >
                                <div className="w-1/4">{unit.location}</div>
                                <div className="w-1/4">{unit.owner}</div>
                                <div className="w-1/4">{unit.owner}</div>
                                <div className="w-1/4">
                                    {formatMoney(unit.balance)}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex justify-center p-8">
                            <h1 className="text-2xl">
                                No hay unidades funcionales para visualizar
                            </h1>
                        </div>
                    )}
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default Charge;