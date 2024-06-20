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
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { CgArrowAlignV } from "react-icons/cg";

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
    const [filteredFunctionalUnits, setFilteredFunctionalUnits] = useState<
        IFunctionalUnits[]
    >([]);
    const [sortConfig, setSortConfig] = useState<{
        field: keyof IFunctionalUnits;
        order: "asc" | "desc";
    } | null>(null);

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
    }, [token, pathname, data]);

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
                        setFilteredFunctionalUnits(response);
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
        setFilteredFunctionalUnits([]);
    };

    const handleHeaderClick = (field: keyof IFunctionalUnits) => {
        let order: "asc" | "desc" = "asc";
        if (
            sortConfig &&
            sortConfig.field === field &&
            sortConfig.order === "asc"
        ) {
            order = "desc";
        }
        setSortConfig({ field, order });
        handleSort(field, order);
    };

    const handleSort = (
        field: keyof IFunctionalUnits,
        order: "asc" | "desc"
    ) => {
        const sortedData = [...filteredFunctionalUnits].sort((a, b) => {
            const valueA = a[field];
            const valueB = b[field];
            if (typeof valueA === "string" && typeof valueB === "string") {
                return order === "asc"
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            } else if (
                typeof valueA === "number" &&
                typeof valueB === "number"
            ) {
                return order === "asc" ? valueA - valueB : valueB - valueA;
            } else {
                return 0;
            }
        });
        setFilteredFunctionalUnits(sortedData);
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
                    <h1
                        className="flex items-center justify-center w-1/5 text-xl cursor-pointer"
                        onClick={() => handleHeaderClick("number")}
                    >
                        Número de UF{" "}
                        {sortConfig?.field === "number" &&
                            (sortConfig.order === "asc" ? (
                                <IoIosArrowUp />
                            ) : (
                                <IoIosArrowDown />
                            ))}
                        {sortConfig?.field !== "number" && (
                            <CgArrowAlignV className="w-4 h-4 ml-1 opacity-1" />
                        )}
                    </h1>
                    <h1
                        className="flex items-center justify-center w-1/5 text-xl cursor-pointer"
                        onClick={() => handleHeaderClick("location")}
                    >
                        Ubicación{" "}
                        {sortConfig?.field === "location" &&
                            (sortConfig.order === "asc" ? (
                                <IoIosArrowUp />
                            ) : (
                                <IoIosArrowDown />
                            ))}
                        {sortConfig?.field !== "location" && (
                            <CgArrowAlignV className="w-4 h-4 ml-1 opacity-1" />
                        )}
                    </h1>
                    <h1
                        className="flex items-center justify-center w-1/5 text-xl cursor-pointer"
                        onClick={() => handleHeaderClick("owner")}
                    >
                        Propietario{" "}
                        {sortConfig?.field === "owner" &&
                            (sortConfig.order === "asc" ? (
                                <IoIosArrowUp />
                            ) : (
                                <IoIosArrowDown />
                            ))}
                        {sortConfig?.field !== "owner" && (
                            <CgArrowAlignV className="w-4 h-4 ml-1 opacity-1" />
                        )}
                    </h1>
                    <h1 className="flex items-center justify-center w-1/5 text-xl cursor-pointer">
                        Inquilino
                    </h1>
                    <h1
                        className="flex items-center justify-center w-1/5 text-xl cursor-pointer"
                        onClick={() => handleHeaderClick("balance")}
                    >
                        Deuda{" "}
                        {sortConfig?.field === "balance" &&
                            (sortConfig.order === "asc" ? (
                                <IoIosArrowUp />
                            ) : (
                                <IoIosArrowDown />
                            ))}
                        {sortConfig?.field !== "balance" && (
                            <CgArrowAlignV className="w-4 h-4 ml-1 opacity-1" />
                        )}
                    </h1>
                </div>
                <div className="flex flex-col justify-center gap-5 py-5 w-[90%]">
                    {filteredFunctionalUnits.length > 0 ? (
                        filteredFunctionalUnits.map((unit) => (
                            <div
                                key={unit.id}
                                className="flex justify-between py-2 text-center text-black bg-gray-200 rounded-lg"
                            >
                                <div className="w-1/5">{unit.number}</div>
                                <div className="w-1/5">{unit.location}</div>
                                <div className="w-1/5">{unit.owner}</div>
                                {unit.user ? (
                                    <div className="w-1/5">
                                        {unit.user?.first_name}{" "}
                                        {unit.user?.last_name}
                                    </div>
                                ) : (
                                    <div className="w-1/5"></div>
                                )}
                                {unit.balance > 0 ? (
                                    <div className="w-1/5 text-red-600">
                                        {formatMoney(unit.balance)}
                                    </div>
                                ) : (
                                    <div className="w-1/5">
                                        {formatMoney(unit.balance)}
                                    </div>
                                )}
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
