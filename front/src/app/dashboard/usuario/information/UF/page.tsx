"use client";
import { IFunctionalUnits } from "@/Interfaces/functionalUnits.interfaces";
import { IUser } from "@/Interfaces/user.interfaces";
import {
    Button,
    ContainerDashboard,
    Input,
    Label,
    Title,
} from "@/components/ui";
import { linkFunctionalUnit } from "@/helpers/fetch.helper.uf";
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
    const router = useRouter();

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

    return (
        <div>
            <ContainerDashboard className="w-[90%] h-[90vh]">
                <Title>Unidad Funcional</Title>
                <div className="flex justify-end my-2 w-[90%]">
                    <Link href="/dashboard">
                        <Button className="w-32 py-2 rounded-[40px]">
                            Volver
                        </Button>
                    </Link>
                </div>
                {user?.functional_units?.length! > 0 && (
                    <div className="w-[90%] h-[90%] border rounded-[40px] flex justify-center items-center flex-col">
                        <div className="flex flex-col">
                            <div className="flex">
                                <p>Tipo: </p>
                                <p>{user?.functional_units?.[0].type}</p>
                            </div>
                            <div className="flex">
                                <p>Locacion: </p>
                                <p>{user?.functional_units?.[0].location}</p>
                            </div>
                            <div className="flex">
                                <p>Numero: </p>
                                <p>{user?.functional_units?.[0].number}</p>
                            </div>
                            <div className="flex">
                                <p>Propietario: </p>
                                <p>{user?.functional_units?.[0].owner}</p>
                            </div>
                            <div className="flex">
                                <p>Telefono del Propietario: </p>
                                <p>
                                    {
                                        user?.functional_units?.[0]
                                            .owner_phone_number
                                    }
                                </p>
                            </div>
                            <div className="flex">
                                <p>Email del Propietario: </p>
                                <p>{user?.functional_units?.[0].owner_email}</p>
                            </div>
                        </div>
                    </div>
                )}
            </ContainerDashboard>
        </div>
    );
};
export default UnidadFuncional;
