"use client";
import { IFunctionalUnits } from "@/Interfaces/functionalUnits.interfaces";
import { IUser } from "@/Interfaces/user.interfaces";
import {
    Button,
    ContainerDashboard,
    Input,
    Label,
    Select,
    Title,
} from "@/components/ui";
import {
    functionalUnitExpensesId,
    linkFunctionalUnit,
} from "@/helpers/fetch.helper.uf";
import { getUserById } from "@/helpers/fetch.helper.user";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import { useUfSesion } from "@/helpers/useUfSesion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UnidadFuncional = () => {
    useAuth();
    const { token, data } = useSesion();
    const { haveUF, isLoading, functional_unit } = useUfSesion();
    const [user, setUser] = useState<IUser>();
    const [functional_units, setFunctionalUnits] =
        useState<IFunctionalUnits[]>();
    const router = useRouter();
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        if (!isLoading && !haveUF) {
            router.push("/dashboard/usuario/addfuncionalunit");
        }
    }, [isLoading, haveUF, router]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserById(data?.id, token);
                if (response?.ok) {
                    const datos = await response.json();
                    setUser(datos);
                    setFunctionalUnits(datos?.functional_units);
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "No se pudo obtener los datos del usuario",
                        icon: "error",
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

    useEffect(() => {
        if (user) {
            setFunctionalUnits(user?.functional_units);
        }
    }, [user]);

    const handleSelect = (e: any) => {
        const index = e.target.value;
        setIndex(index);
    };
    return (
        <div>
            <ContainerDashboard className="w-[90%] h-[90vh]">
                <Title>Unidad Funcional</Title>
                <div className="flex justify-between w-[90%]">
                    <div className="flex w-60">
                        <Select onChange={handleSelect}>
                            <option value="" disabled>
                                Selecciona la unidad funcional
                            </option>
                            {functional_units?.map((uf, index) => (
                                <option key={uf.id} value={index}>
                                    {uf.location}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div className="flex justify-end my-2 w-[90%] gap-1">
                        <Link href="/dashboard/usuario/addfuncionalunit">
                            <Button className="w-44 py-2 rounded-[40px]">
                                Agregar unidad Funcional
                            </Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button className="w-32 py-2 rounded-[40px]">
                                Volver
                            </Button>
                        </Link>
                    </div>
                </div>
                {user?.functional_units?.length! > 0 && (
                    <div className="w-1/2 h-[60%] border rounded-[40px] flex justify-center items-center flex-col bg-neutral-100 mt-20">
                        <div className="w-[80%] flex flex-col gap-2">
                            <div className="flex items-center justify-center mb-8">
                                <p className="text-2xl text-black">
                                    Datos de la unidad funcional
                                </p>
                            </div>
                            <div className="flex w-full gap-2 p-3 border rounded-[40px] border-black">
                                <p className="font-bold text-black">Tipo: </p>
                                <p className="text-black">
                                    {user?.functional_units?.[index].type}
                                </p>
                            </div>
                            <div className="flex w-full gap-2 p-3 border rounded-[40px] border-black">
                                <p className="font-bold text-black">
                                    Locacion:{" "}
                                </p>
                                <p className="text-black">
                                    {user?.functional_units?.[index].location}
                                </p>
                            </div>
                            <div className="flex w-full gap-2 p-3 border rounded-[40px] border-black">
                                <p className="font-bold text-black">Numero: </p>
                                <p className="text-black">
                                    {user?.functional_units?.[index].number}
                                </p>
                            </div>
                            <div className="flex w-full gap-2 p-3 border rounded-[40px] border-black">
                                <p className="font-bold text-black">
                                    Propietario:{" "}
                                </p>
                                <p className="text-black">
                                    {user?.functional_units?.[index].owner}
                                </p>
                            </div>
                            <div className="flex w-full gap-2 p-3 border rounded-[40px] border-black">
                                <p className="font-bold text-black">
                                    Telefono del Propietario:{" "}
                                </p>
                                <p className="text-black">
                                    {
                                        user?.functional_units?.[index]
                                            .owner_phone_number
                                    }
                                </p>
                            </div>
                            <div className="flex w-full gap-2 p-3 border rounded-[40px] border-black">
                                <p className="font-bold text-black">
                                    Email del Propietario:{" "}
                                </p>
                                <p className="text-black">
                                    {
                                        user?.functional_units?.[index]
                                            .owner_email
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </ContainerDashboard>
        </div>
    );
};
export default UnidadFuncional;
