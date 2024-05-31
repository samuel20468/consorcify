"use client";

import { useState } from "react";
import { Button, Input, Label } from "../ui";
import { handleRegisterConsortium } from "@/helpers/form.helper";
import { useRouter } from "next/navigation";
import {
    IRegisterConsortium,
    IRegisterConsortiumError,
} from "@/Interfaces/Interfaces";

const FormRegisterSuperAdmin = () => {
    const router = useRouter();
    const initialData = {
        name: "",
        adress: "",
        email: "",
        phone_number: "",
        sat: "",
        password: "",
        rpa: "",
        cuit: "",
    };

    const [consortiumRegister, setConsortiumRegister] =
        useState<IRegisterConsortium>(initialData);

    const [errorConsortiumRegister, setErrorConsortiumRegister] =
        useState<IRegisterConsortiumError>(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConsortiumRegister({
            ...consortiumRegister,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        try {
            await handleRegisterConsortium(consortiumRegister);
            alert("Registro del consorcio exitoso.");
            // router.push("/") Definir donde nos va a pataear una vez creado el consorcio
            setConsortiumRegister(initialData);
        } catch (error: any) {
            console.error(error);
        }
    };

    // Resta hacer las validaciones !!!

    return (
        <div className="flex flex-col items-center w-full p-10 rounded-lg shadow-lg bg-slate-200 ">
            <h1>El formulario de registro del superadmin</h1>

            <form
                className="flex flex-col w-full max-w-xl"
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Label htmlFor="name">
                    Nombre:<span className="text-red-600">*</span>
                </Label>
                <Input
                    id="name"
                    name="name"
                    value={consortiumRegister.name}
                    type="text"
                    placeholder="Nombre"
                    onChange={handleChange}
                />
                <Label htmlFor="adress">
                    Dirección:<span className="text-red-600">*</span>
                </Label>
                <Input
                    id="adress"
                    name="adress"
                    value={consortiumRegister.adress}
                    type="text"
                    placeholder="Dirección"
                    onChange={handleChange}
                />
                <Label htmlFor="phone_number">
                    Teléfono:<span className="text-red-600">*</span>
                </Label>
                <Input
                    id="phone_number"
                    name="phone_number"
                    value={consortiumRegister.phone_number}
                    type="text"
                    placeholder="Teléfono"
                    onChange={handleChange}
                />
                <Label htmlFor="cuit">
                    Cuit:<span className="text-red-600">*</span>
                </Label>
                <Input
                    id="cuit"
                    name="cuit"
                    value={consortiumRegister.cuit}
                    type="text"
                    placeholder="Número de CUIT"
                    onChange={handleChange}
                />
                <Label htmlFor="sat">
                    Situación Fiscal:<span className="text-red-600">*</span>
                </Label>
                <Input
                    id="sat"
                    name="sat"
                    value={consortiumRegister.sat}
                    type="text"
                    placeholder="Situación Fiscal"
                    onChange={handleChange}
                />
                <Label htmlFor="rpa">
                    Inscripción RPA:
                    <span className="text-red-600">*</span>
                </Label>
                <Input
                    id="rpa"
                    name="rpa"
                    value={consortiumRegister.rpa}
                    type="text"
                    placeholder="Inscripción RPA"
                    onChange={handleChange}
                />
                <Label htmlFor="email">
                    Email:<span className="text-red-600">*</span>
                </Label>
                <Input
                    id="email"
                    name="email"
                    value={consortiumRegister.email}
                    type="email"
                    placeholder="Correo electrónico"
                    onChange={handleChange}
                />
                <Label htmlFor="password">
                    Password:
                    <span className="text-red-600">*</span>
                </Label>
                <Input
                    id="password"
                    name="password"
                    value={consortiumRegister.password}
                    type="password"
                    placeholder="**********"
                    onChange={handleChange}
                />
                <div className="mt-4">
                    <Button
                        type="submit"
                        disabled={
                            consortiumRegister.name === "" ||
                            consortiumRegister.adress === "" ||
                            consortiumRegister.email === "" ||
                            consortiumRegister.phone_number === "" ||
                            consortiumRegister.password === "" ||
                            consortiumRegister.cuit === "" ||
                            consortiumRegister.sat === "" ||
                            consortiumRegister.rpa === ""
                        }
                    >
                        Registrar
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FormRegisterSuperAdmin;
