"use client";

// Estilos y componentes
import { Button, ContainerDashboard, Select, Title } from "@/components/ui";
import ExpenditureCards from "@/components/ExpenditureCards/ExpenditureCards";

// Endpoints
import {
    getConsortiums,
    getExpenditures,
    getSuppliers,
} from "@/helpers/fetch.helper";

// Interfaces
import {
    IConsortium,
    IExpenditures,
    ISuppliers,
} from "@/Interfaces/Interfaces";

// Hooks
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";

// ------------------

const Spent = () => {
    useAuth();
    const { token } = useSesion();
    const router = useRouter();
    const pathname = usePathname();
    const [expenditures, setExpenditures] = useState<IExpenditures[]>([]);
    const [suppliers, setSuppliers] = useState<ISuppliers[]>([]);
    const [consortiums, setConsortiums] = useState<IConsortium[]>([]);
    const [filteredExpenditures, setFilteredExpenditures] = useState<
        IExpenditures[]
    >([]);
    const [sortConfig, setSortConfig] = useState<{
        field: keyof IExpenditures;
        order: "asc" | "desc";
    } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getExpenditures(token);
                if (response) {
                    const data = await response.json();
                    setExpenditures(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fetchData();
        }
    }, [token, pathname]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getConsortiums(token);
                if (response) {
                    const data = await response.json();
                    setConsortiums(data);
                }
            } catch (error) {}
        };
        if (token) {
            fetchData();
        }
    }, [token, pathname]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getSuppliers(token);
                if (response) {
                    const data = await response.json();
                    setSuppliers(data);
                }
            } catch (error) {}
        };
        if (token) {
            fetchData();
        }
    }, [token, pathname]);

    const handleOnClick = () => {
        router.push("/addSpent");
    };

    const handleSort = (field: keyof IExpenditures, order: "asc" | "desc") => {
        const sortedData = [...expenditures].sort((a, b) => {
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

        setExpenditures(sortedData);
    };

    const handleHeaderClick = (field: keyof IExpenditures) => {
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

    return (
        <div className="h-screen text-white">
            <ContainerDashboard>
                <Title>Gastos</Title>
                <div className="flex justify-between w-[95%]">
                    <div className="flex justify-start gap-3">
                        <Select
                            id="consortium_id"
                            name="consortium_id"
                            defaultValue=""
                            // value={adminRegister.sat}
                            // onChange={handleSelect}
                        >
                            <option value="" disabled>
                                Selecciona el consorcio
                            </option>
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

                        <Select
                            id="supplier_id"
                            name="supplier_id"
                            defaultValue=""
                            // value={adminRegister.sat}
                            // onChange={handleSelect}
                        >
                            <option value="" disabled>
                                Seleccionar proveedor
                            </option>
                            {suppliers.length > 0 &&
                                suppliers.map((supplier) => (
                                    <option
                                        value={supplier.id}
                                        key={supplier.id}
                                    >
                                        {supplier.name}
                                    </option>
                                ))}
                        </Select>
                    </div>
                    <div className="flex items-end">
                        <Button
                            onClick={handleOnClick}
                            className="py-2 px-4 rounded-[40px]"
                        >
                            Agregar gasto
                        </Button>
                    </div>
                </div>
                <div className="w-[90%] border-t border-b border-white flex justify-around p-2 my-5 text-center">
                    <h1>Expensa</h1>
                    <h1>Consorcio</h1>
                    <h1>Proveedor</h1>
                    <h1
                        className="cursor-pointer"
                        onClick={() => handleHeaderClick("total_amount")}
                    >
                        Monto
                    </h1>
                    <h1>Eliminar</h1>
                </div>
                {expenditures.length > 0 ? (
                    <ExpenditureCards expenditures={expenditures} />
                ) : (
                    <div className="p-8">
                        <h1 className="text-2xl">
                            Aún no hay gastos registrados
                        </h1>
                    </div>
                )}
            </ContainerDashboard>
        </div>
    );
};

export default Spent;
