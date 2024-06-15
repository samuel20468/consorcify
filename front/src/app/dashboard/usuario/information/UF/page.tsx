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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UnidadFuncional = () => {
    useAuth();
    const router = useRouter();
    const { token, data } = useSesion();
    const [user, setUser] = useState<IUser>();
    const [code, setCode] = useState<string>();
    const [unidadFuncional, setUnidadFuncional] = useState<IFunctionalUnits[]>(
        []
    );
    console.log(user);

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
    }, [token, unidadFuncional]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await linkFunctionalUnit(data.id, token, code!);
            console.log(response);

            if (response) {
                router.push("/dashboard/usuario/information/UF");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "No se pudo vincular la unidad funcional a la cuenta",
                    icon: "error",
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    };

    return (
        <div>
            <ContainerDashboard className="w-[90%] h-[90vh]">
                <Title>Unidad Funcional</Title>
                <div className="flex justify-end my-2 w-[90%]">
                    <Link href="/dashboard/usuario/information">
                        <Button className="w-32 py-2 rounded-[40px]">
                            Volver
                        </Button>
                    </Link>
                </div>
                <div className="w-[90%] h-[90%] border rounded-[40px] flex justify-center items-center flex-col">
                    {user?.functional_units ? (
                        <div className="flex flex-col">
                            <div className="flex">
                                <p>Tipo: </p>
                                <p>{user.functional_units?.[0].type}</p>
                            </div>
                            <div className="flex">
                                <p>Locacion: </p>
                                <p>{user.functional_units?.[0].location}</p>
                            </div>
                            <div className="flex">
                                <p>Numero: </p>
                                <p>{user.functional_units?.[0].number}</p>
                            </div>
                            <div className="flex">
                                <p>Propietario: </p>
                                <p>{user.functional_units?.[0].owner}</p>
                            </div>
                            <div className="flex">
                                <p>Telefono del Propietario: </p>
                                <p>
                                    {
                                        user.functional_units?.[0]
                                            .owner_phone_number
                                    }
                                </p>
                            </div>
                            <div className="flex">
                                <p>Email del Propietario: </p>
                                <p>{user.functional_units?.[0].owner_email}</p>
                            </div>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col items-center justify-center gap-2"
                        >
                            <div className="text-[20px] font-bold">
                                <Label>Codigo de la unidad funcional</Label>
                                <Input
                                    type="text"
                                    name="functional_units"
                                    placeholder="Codigo de la unidad funcional"
                                    onChange={handleChange}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full py-2 rounded-[40px]"
                            >
                                Aceptar
                            </Button>
                        </form>
                    )}
                </div>
            </ContainerDashboard>
        </div>
    );
};
export default UnidadFuncional;
