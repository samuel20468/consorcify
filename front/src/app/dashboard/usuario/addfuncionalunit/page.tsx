"use client";
import {
    Button,
    ContainerDashboard,
    Input,
    Label,
    Title,
} from "@/components/ui";
import { linkFunctionalUnit } from "@/helpers/fetch.helper.uf";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

const AddFU = () => {
    useAuth();
    const router = useRouter();
    const { token, data } = useSesion();

    const [code, setCode] = useState<string>();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!code) {
            Swal.fire({
                title: "Error",
                text: "Debe ingresar un codigo de la unidad funcional",
                icon: "error",
            });
            return;
        }
        if (code.length !== 8) {
            Swal.fire({
                title: "Error",
                text: "El codigo debe tener 8 caracteres",
                icon: "error",
            });
            setCode("");
            return;
        }

        try {
            const response = await linkFunctionalUnit(data.id, token, code!);

            if (response) {
                router.push("/dashboard/usuario/information/UF");
            } else if (response.status === 409) {
                Swal.fire({
                    title: "Error",
                    text: "No se pudo vincular la unidad funcional a la cuenta",
                    icon: "error",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: (error as Error).message,
                icon: "error",
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    };

    return (
        <ContainerDashboard className="w-[90%] h-[90vh] items-center ">
            <Title>Agregar unidad funcional</Title>
            <div className="flex justify-center items-center border rounded-[40px] w-1/2 h-1/2">
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
            </div>
        </ContainerDashboard>
    );
};

export default AddFU;
