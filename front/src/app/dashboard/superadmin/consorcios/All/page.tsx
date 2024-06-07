"use client";
import { IConsortium } from "@/Interfaces/Interfaces";
import ConsortiumCard from "@/components/ConsortiumCard/ConsortiumCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import { Button, ContainerDashboard } from "@/components/ui";
import { getConsortiums } from "@/helpers/fetch.helper";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
    useAuth();
    const { token } = useSesion();
    const [consortiums, setConsortiums] = useState<IConsortium[]>([]);
    const [result, setResult] = useState<IConsortium[]>([]);

    const path = usePathname();

    useEffect(() => {
        const fetchData = async (token: string) => {
            const response = await getConsortiums(token);

            if (response) {
                const data = await response.json();
                setConsortiums(data);
                setResult(data);
            }
        };
        if (token) {
            fetchData(token);
        }
    }, [token, path]);

    const handleSearch = (query: string) => {
        const trimmedQuery = query.trim().toLocaleLowerCase();

        if (!trimmedQuery) {
            setResult(consortiums || []);
            return;
        }

        const filteredData = (consortiums || []).filter(
            (consortium: IConsortium) => {
                return Object.values(consortium).some((value) => {
                    return (
                        typeof value === "string" &&
                        value.toLocaleLowerCase().includes(trimmedQuery)
                    );
                });
            }
        );

        setResult(filteredData);
    };

    const handleSort = (field: keyof IConsortium, order: "asc" | "desc") => {
        const sortedData = [...result].sort((a, b) => {
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

        setResult(sortedData);
    };

    return (
        <ContainerDashboard className="flex flex-col w-[90%] items-center py-5 justify-center bg-[#e5e7eb] ">
            <div className="flex justify-end w-full px-3">
                <Link href="/dashboard/superadmin/consorcios">
                    <Button className="w-20 py-2 rounded-[40px]">Volver</Button>
                </Link>
            </div>
            <div className="w-[80%] h-full flex gap-3 px-10 border border-black p-3">
                <div className="w-full">
                    <SearchBar onSearch={handleSearch} />
                </div>
                <div className="flex items-center justify-center w-full gap-3 ">
                    <p className="text-lg text-black">Filtrar por:</p>
                    <select
                        className="h-10 p-2 my-1 text-gray-200 rounded-md shadow-xl bg-input placeholder:font-extralight placeholder:text-gray-500 focus:outline-none no-spinners"
                        onChange={(e) =>
                            handleSort(
                                e.target.value as keyof IConsortium,
                                "asc"
                            )
                        }
                    >
                        <option value="name">Nombre</option>
                        <option value="cuit">CUIT</option>
                        <option value="street_name">Calle</option>
                        <option value="building_number">
                            Número de Edificio
                        </option>
                        <option value="zip_code">Código Postal</option>
                        <option value="country">País</option>
                        <option value="province">Provincia</option>
                        <option value="city">Ciudad</option>
                        <option value="floors">Pisos</option>
                        <option value="ufs">Unidades Funcionales</option>
                        <option value="category">Categoría</option>
                        <option value="first_due_day">
                            Primer Día de Vencimiento
                        </option>
                    </select>
                </div>

                <select
                    className="h-10 p-2 my-1 text-gray-200 rounded-md shadow-xl bg-input placeholder:font-extralight placeholder:text-gray-500 focus:outline-none no-spinners"
                    onChange={(e) =>
                        handleSort("name", e.target.value as "asc" | "desc")
                    }
                >
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
            </div>
            {result?.map((consortium: IConsortium) => (
                <Link
                    key={consortium.id}
                    href={`/dashboard/superadmin/consorcios/All/${consortium.id}`}
                    className="flex items-center justify-center w-full my-1"
                >
                    <ConsortiumCard consortium={consortium} />
                </Link>
            ))}
        </ContainerDashboard>
    );
};

export default Page;
