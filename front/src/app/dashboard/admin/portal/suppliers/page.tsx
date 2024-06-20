"use client";

// Estilos y componentes
import { Button, ContainerDashboard, Select, Title } from "@/components/ui";
import SuppliersCards from "@/components/SuppliersCards/SuppliersCards";

// Endpoints
import { getSuppliersByConsortiumId } from "@/helpers/fetch.helper.supplier"; // Cambiar la función para obtener proveedores por ID de consorcio
import { getConsortiumsByAdminId } from "@/helpers/fetch.helper.consortium";

// Interfaces
import { ISupplier } from "@/Interfaces/suppliers.interfaces";
import { IConsortium } from "@/Interfaces/consortium.interfaces";

// Hooks
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import Link from "next/link";
import useSesion from "@/helpers/useSesion";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { CgArrowAlignV } from "react-icons/cg";

// ------------------

const Supplies = () => {
    useAuth();
    const { token, data } = useSesion();
    const pathname = usePathname();
    const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
    const [consortiums, setConsortiums] = useState<IConsortium[]>([]);
    const [selectedConsortiumId, setSelectedConsortiumId] = useState<
        string | null
    >(null);
    const [sortConfig, setSortConfig] = useState<{
        field: keyof ISupplier;
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
    }, [token, data.id]);

    useEffect(() => {
        const fetchSuppliers = async () => {
            if (!selectedConsortiumId) return;
            try {
                const response = await getSuppliersByConsortiumId(
                    selectedConsortiumId,
                    token
                );
                if (response) {
                    const data = await response.json();
                    setSuppliers(data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (token && selectedConsortiumId) {
            fetchSuppliers();
        }
    }, [token, selectedConsortiumId]);

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedConsortiumId(event.target.value);
    };

    const handleHeaderClick = (field: keyof ISupplier) => {
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

    const handleSort = (field: keyof ISupplier, order: "asc" | "desc") => {
        const sortedData = [...suppliers].sort((a, b) => {
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
        setSuppliers(sortedData);
    };

    return (
        <div className="h-screen">
            <ContainerDashboard>
                <Title>
                    Portal{" "}
                    <span className="text-2xl font-thin">| Proveedores</span>
                </Title>

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
                    <div className="flex w-1/3">
                        <Link
                            className="flex justify-end w-full mr-5"
                            href={"/addSupplier"}
                        >
                            <Button className="w-1/2 p-2 rounded-[40px]">
                                Agregar Proveedor
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="w-[90%] border-t border-b border-white flex justify-between p-2 mt-5 text-center">
                    <h1
                        className="flex items-center justify-center w-1/5 text-xl cursor-pointer"
                        onClick={() => handleHeaderClick("name")}
                    >
                        Nombre{" "}
                        {sortConfig?.field === "name" &&
                            (sortConfig.order === "asc" ? (
                                <IoIosArrowUp />
                            ) : (
                                <IoIosArrowDown />
                            ))}
                        {sortConfig?.field !== "name" && (
                            <CgArrowAlignV className="w-4 h-4 ml-1 opacity-1" />
                        )}
                    </h1>
                    <h1
                        className="flex items-center justify-center w-1/5 text-xl cursor-pointer"
                        onClick={() => handleHeaderClick("cuit")}
                    >
                        CUIT{" "}
                        {sortConfig?.field === "cuit" &&
                            (sortConfig.order === "asc" ? (
                                <IoIosArrowUp />
                            ) : (
                                <IoIosArrowDown />
                            ))}
                        {sortConfig?.field !== "cuit" && (
                            <CgArrowAlignV className="w-4 h-4 ml-1 opacity-1" />
                        )}
                    </h1>
                    <h1
                        className="flex items-center justify-center w-1/5 text-xl cursor-pointer"
                        onClick={() => handleHeaderClick("email")}
                    >
                        Email{" "}
                        {sortConfig?.field === "email" &&
                            (sortConfig.order === "asc" ? (
                                <IoIosArrowUp />
                            ) : (
                                <IoIosArrowDown />
                            ))}
                        {sortConfig?.field !== "email" && (
                            <CgArrowAlignV className="w-4 h-4 ml-1 opacity-1" />
                        )}
                    </h1>
                    <h1
                        className="flex items-center justify-center w-1/5 text-xl cursor-pointer"
                        onClick={() => handleHeaderClick("phone_number")}
                    >
                        Teléfono{" "}
                        {sortConfig?.field === "phone_number" &&
                            (sortConfig.order === "asc" ? (
                                <IoIosArrowUp />
                            ) : (
                                <IoIosArrowDown />
                            ))}
                        {sortConfig?.field !== "phone_number" && (
                            <CgArrowAlignV className="w-4 h-4 ml-1 opacity-1" />
                        )}
                    </h1>
                    <h1
                        className="flex items-center justify-center w-1/5 text-xl cursor-pointer"
                        onClick={() => handleHeaderClick("address")}
                    >
                        Dirección{" "}
                        {sortConfig?.field === "address" &&
                            (sortConfig.order === "asc" ? (
                                <IoIosArrowUp />
                            ) : (
                                <IoIosArrowDown />
                            ))}
                        {sortConfig?.field !== "address" && (
                            <CgArrowAlignV className="w-4 h-4 ml-1 opacity-1" />
                        )}
                    </h1>{" "}
                </div>
                {suppliers.length > 0 ? (
                    <SuppliersCards suppliers={suppliers} roles={data?.roles} />
                ) : (
                    <div className="p-8">
                        <h1 className="text-2xl">
                            Aún no hay proveedores registrados
                        </h1>
                    </div>
                )}
            </ContainerDashboard>
        </div>
    );
};

export default Supplies;
