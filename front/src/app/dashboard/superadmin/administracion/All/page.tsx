"use client";

// Estilos y componentes
import { Button, ContainerDashboard, Title } from "@/components/ui";
import SearchBar from "@/components/SearchBar/SearchBar";

// Interfaces
import { IAdmin } from "@/Interfaces/admin.interfaces";

// Endpoints
import { getAdmins } from "@/helpers/fetch.helper.admin";

// Hooks
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import Link from "next/link";

// -------------------

const Page = () => {
    useAuth();
    const pathname = usePathname();
    const { token } = useSesion();
    const [admins, setAdmins] = useState<IAdmin[]>([]);
    const [result, setResult] = useState<IAdmin[]>([]);

    useEffect(() => {
        const fetchData = async (token: string) => {
            const response = await getAdmins(token);
            if (response) {
                const data = await response.json();
                setAdmins(data);
                setResult(data);
                console.log(data);
            }
        };
        if (token) {
            fetchData(token);
        }
    }, [token, pathname]);

    const handleSearch = (query: string) => {
        const trimmedQuery = query.trim().toLocaleLowerCase();

        if (!trimmedQuery) {
            setResult(admins || []);
            return;
        }

        const filteredData = (admins || []).filter((consortium: IAdmin) => {
            return Object.values(consortium).some((value) => {
                return (
                    typeof value === "string" &&
                    value.toLocaleLowerCase().includes(trimmedQuery)
                );
            });
        });

        setResult(filteredData);
    };

    const handleSort = (field: keyof IAdmin, order: "asc" | "desc") => {
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
        <div className="h-screen text-white">
            <ContainerDashboard>
                <Title>
                    Administración{" "}
                    <span className="text-2xl font-thin">
                        | Administraciones
                    </span>
                </Title>
                <div className="w-full mb-10">
                    <SearchBar onSearch={handleSearch} />
                </div>
                <div className="w-[90%] h-full flex gap-3 px-10 bg-[#d3d3d3] p-3 items-center">
                    <div className="flex items-center justify-center w-full gap-3 ">
                        <p className="text-lg text-black">Filtrar por:</p>
                        <select
                            className="h-10 p-2 my-1 text-gray-200 rounded-md shadow-xl bg-input placeholder:font-extralight placeholder:text-gray-500 focus:outline-none no-spinners"
                            onChange={(e) =>
                                handleSort(
                                    e.target.value as keyof IAdmin,
                                    "asc"
                                )
                            }
                        >
                            <option value="name">Nombre</option>
                            <option value="cuit">CUIT</option>
                            <option value="phone_numer">Teléfono</option>
                            <option value="email">Email</option>
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
                    <div className="flex justify-end w-full px-3">
                        <Link href="/dashboard/superadmin/consorcios">
                            <Button className="w-20 py-2 rounded-[40px]">
                                Volver
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full gap-4">
                    {admins?.length > 0 ? (
                        result?.map((elemento) => {
                            return (
                                <Link
                                    key={elemento.id}
                                    href={`/dashboard/superadmin/administracion/All/${elemento.id}`}
                                    className="text-black flex w-3/4 rounded border border-black mx-2 p-3 bg-[#dadada] hover:scale-110 hover:transition hover:duration-700"
                                >
                                    <div className="flex justify-between w-full text-center">
                                        <p className="w-[25%]">
                                            {elemento.name}
                                        </p>
                                        <p className="w-[25%]">
                                            {elemento.cuit}
                                        </p>
                                        <p className="w-[25%]">
                                            {elemento.phone_number}
                                        </p>
                                        <p className="w-[25%]">
                                            {elemento.email}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <div>Todavia no hay administradores</div>
                    )}
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default Page;
