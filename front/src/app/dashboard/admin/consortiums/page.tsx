"use client";

// Estilos y componentes
import { Button, ContainerDashboard, Select, Title } from "@/components/ui";
import ConsortiumDetails from "@/components/ConsortiumDetails/ConsortiumDetails";

// Endpoints
import { getConsortiums } from "@/helpers/fetch.helper.consortium";

// Interfaces
import { IConsortium } from "@/Interfaces/consortium.interfaces";

// Hooks
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import Link from "next/link";

// ----------------------

const Consortium = () => {
    useAuth();
    const [consortiums, setConsortiums] = useState<IConsortium[]>([]);
    const [selectedConsortiumId, setSelectedConsortiumId] = useState<
        string | null
    >(null);
    const { token } = useSesion();
    const pathname = usePathname();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getConsortiums(token);
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
            fetchData();
        }
    }, [token, pathname]);

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedConsortiumId(event.target.value);
    };

    const selectedConsortium = consortiums.find(
        (c) => c.id === selectedConsortiumId
    );

    return (
        <div className="h-screen bg-fondo">
            <ContainerDashboard>
                <Title>Consorcios</Title>
                <div className="flex items-center justify-around w-full">
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
                    <Link
                        className="flex justify-center w-1/6"
                        href={"/addConsortium"}
                    >
                        <Button className="w-full p-2 rounded-xl">
                            Agregar consorcio
                        </Button>
                    </Link>
                </div>
                {selectedConsortium ? (
                    <div className="flex justify-center gap-5 py-5 w-[90%]">
                        <ConsortiumDetails {...selectedConsortium} />
                    </div>
                ) : (
                    <div className="p-8">
                        <h1 className="text-2xl">
                            Aún no hay consorcios registrados
                        </h1>
                    </div>
                )}
                <div className="flex justify-between w-2/4 mt-2 mb-10">
                    <div className="w-1/3 ml-12">
                        <Link
                            href={`/dashboard/admin/consortiums/${selectedConsortiumId}`}
                        >
                            <Button className="w-2/4 p-2 rounded-xl">
                                Ver detalle
                            </Button>
                        </Link>
                    </div>
                    <div className="flex justify-end w-2/3 gap-3 mr-12">
                        <Link href="#" className="w-1/4">
                            <Button className="w-full p-2 rounded-xl">
                                Modificar
                            </Button>
                        </Link>
                        <Link href="#" className="w-1/4">
                            <Button className="w-full p-2 rounded-xl">
                                Eliminar
                            </Button>
                        </Link>
                    </div>
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default Consortium;
