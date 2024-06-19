"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { ISupplier } from "@/Interfaces/suppliers.interfaces";
import SearchBar from "@/components/SearchBar/SearchBar";
import SuppliersCards from "@/components/SuppliersCards/SuppliersCards";
import { ContainerDashboard, Title } from "@/components/ui";
import { getSuppliersByConsortiumId } from "@/helpers/fetch.helper.supplier";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import { useUfSesion } from "@/helpers/useUfSesion";
import { usePathname } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { CgArrowAlignV } from "react-icons/cg";
const Workers = () => {
    // Hooks de autenticación y sesión
    useAuth();
    const { token, data } = useSesion();
    const { isLoading, functional_unit } = useUfSesion();
    const path = usePathname();
    const router = useRouter();

    // Estado para proveedores y resultados filtrados
    const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
    const [result, setResult] = useState<ISupplier[]>([]);

    // Estado para ID del consorcio actual
    const [id, setId] = useState<string>("");

    // Estado para ordenamiento
    const [sortBy, setSortBy] = useState<string>("name"); // Propiedad inicial de ordenamiento por nombre
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Orden inicial ascendente

    // Obtener ID del consorcio desde la sesión
    useEffect(() => {
        if (functional_unit) {
            setId(functional_unit?.[0]?.consortium?.id || "");
        }
    }, [functional_unit]);

    // Obtener proveedores por ID de consorcio
    useEffect(() => {
        const getSuppliers = async () => {
            try {
                const response = await getSuppliersByConsortiumId(id, token);
                if (response.ok) {
                    const suppliers = await response.json();
                    setSuppliers(suppliers);
                    setResult(suppliers);
                } else {
                    console.log("No se encontraron proveedores");
                    Swal.fire({
                        title: "Error al obtener proveedores",
                        text: "Por favor, inténtelo de nuevo más tarde",
                        icon: "error",
                        confirmButtonText: "Aceptar",
                    });
                }
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: "Error al obtener proveedores",
                    text: (error as Error).message,
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            }
        };
        if (token && id) {
            getSuppliers();
        }
    }, [token, path, id]);

    // Redireccionar si no se ha cargado la UF
    useEffect(() => {
        if (!isLoading && !functional_unit) {
            router.push("/dashboard/usuario/addfuncionalunit");
        }
    }, [isLoading, functional_unit, router]);

    // Función para manejar la búsqueda
    const handleSearch = (query: string) => {
        const trimmedQuery = query.trim().toLocaleLowerCase();

        if (!trimmedQuery) {
            setResult(suppliers || []);
            return;
        }

        const filteredData = (suppliers || []).filter((supplier: ISupplier) => {
            return Object.values(supplier).some((value) => {
                return (
                    typeof value === "string" &&
                    value.toLocaleLowerCase().includes(trimmedQuery)
                );
            });
        });

        setResult(filteredData);
    };

    // Función para cambiar la propiedad de ordenamiento
    const handleSortChange = (property: string) => {
        if (property === sortBy) {
            // Si ya está ordenando por la misma propiedad, cambia el orden
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            // Si es una nueva propiedad de ordenamiento, establece la propiedad y el orden ascendente por defecto
            setSortBy(property);
            setSortOrder("asc");
        }
    };

    // Función para ordenar los proveedores
    const sortSuppliers = (a: ISupplier, b: ISupplier) => {
        const propA: string =
            typeof a[sortBy as keyof ISupplier] === "string"
                ? (a[sortBy as keyof ISupplier] as string).toUpperCase()
                : "";
        const propB: string =
            typeof b[sortBy as keyof ISupplier] === "string"
                ? (b[sortBy as keyof ISupplier] as string).toUpperCase()
                : "";

        let comparison = 0;
        if (propA > propB) {
            comparison = 1;
        } else if (propA < propB) {
            comparison = -1;
        }

        return sortOrder === "desc" ? comparison * -1 : comparison;
    };

    // Ordenar los proveedores cuando cambie sortBy o sortOrder
    useEffect(() => {
        const sortedData = [...result].sort(sortSuppliers);
        setResult(sortedData);
    }, [sortBy, sortOrder]);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <ContainerDashboard>
                <Title>Proveedores</Title>
                <div className="w-[90%]">
                    <SearchBar
                        onSearch={handleSearch}
                        searchString="Proveedores"
                    />
                </div>
                <div className="w-[90%] border-t border-b border-white flex justify-between p-2 mt-5 text-center">
                    <h1
                        className="w-1/5 text-xl cursor-pointer flex items-center justify-center"
                        onClick={() => handleSortChange("name")}
                    >
                        Nombre{" "}
                        {sortBy === "name" && (
                            <>
                                {sortOrder === "asc" ? (
                                    <IoIosArrowUp className="w-4 h-4 ml-1" />
                                ) : (
                                    <IoIosArrowDown className="w-4 h-4 ml-1" />
                                )}
                            </>
                        )}
                        {sortBy !== "name" && (
                            <CgArrowAlignV className="w-4 h-4 ml-1 opacity-1" />
                        )}
                    </h1>
                    <h1
                        className="w-1/5 text-xl cursor-pointer flex items-center justify-center"
                        onClick={() => handleSortChange("cuit")}
                    >
                        Cuit{" "}
                        {sortBy === "cuit" && (
                            <>
                                {sortOrder === "asc" ? (
                                    <IoIosArrowUp className="w-4 h-4 ml-1" />
                                ) : (
                                    <IoIosArrowDown className="w-4 h-4 ml-1" />
                                )}
                            </>
                        )}
                        {sortBy !== "cuit" && (
                            <CgArrowAlignV className="w-4 h-4 ml-1 opacity-1" />
                        )}
                    </h1>
                    <h1
                        className="w-1/5 text-xl cursor-pointer flex items-center justify-center"
                        onClick={() => handleSortChange("email")}
                    >
                        E-mail{" "}
                        {sortBy === "email" && (
                            <>
                                {sortOrder === "asc" ? (
                                    <IoIosArrowUp className="w-4 h-4 ml-1" />
                                ) : (
                                    <IoIosArrowDown className="w-4 h-4 ml-1" />
                                )}
                            </>
                        )}
                        {sortBy !== "email" && (
                            <CgArrowAlignV className="w-4 h-4 ml-1 opacity-1" />
                        )}
                    </h1>
                    <h1
                        className="w-1/5 text-xl cursor-pointer flex items-center justify-center"
                        onClick={() => handleSortChange("phone_number")}
                    >
                        Teléfono{" "}
                        {sortBy === "phone_number" && (
                            <>
                                {sortOrder === "asc" ? (
                                    <IoIosArrowUp className="w-4 h-4 ml-1" />
                                ) : (
                                    <IoIosArrowDown className="w-4 h-4 ml-1" />
                                )}
                            </>
                        )}
                        {sortBy !== "phone_number" && (
                            <CgArrowAlignV className="w-4 h-4 ml-1 opacity-1" />
                        )}
                    </h1>
                    <h1
                        className="w-1/5 text-xl cursor-pointer flex items-center justify-center"
                        onClick={() => handleSortChange("address")}
                    >
                        Dirección{" "}
                        {sortBy === "address" && (
                            <>
                                {sortOrder === "asc" ? (
                                    <IoIosArrowUp className="w-4 h-4 ml-1" />
                                ) : (
                                    <IoIosArrowDown className="w-4 h-4 ml-1" />
                                )}
                            </>
                        )}
                        {sortBy !== "address" && (
                            <CgArrowAlignV className="w-4 h-4 ml-1 opacity-1" />
                        )}
                    </h1>
                </div>
                {result.length > 0 ? (
                    <SuppliersCards suppliers={result} roles={data?.roles} />
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

export default Workers;
