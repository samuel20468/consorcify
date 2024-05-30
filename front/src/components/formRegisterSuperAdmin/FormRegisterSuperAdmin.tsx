"use client";

import { useState } from "react";
import { Button, Input, Label } from "../ui";
import {
    IRegisterConsortium,
    IRegisterConsortiumError,
    handleRegisterConsortium,
} from "@/helpers/form.helper";
import { useRouter } from "next/navigation";

const FormRegisterSuperAdmin = () => {
    const router = useRouter();
    const initialData = {
        name: "",
        adress: "",
        email: "",
        phone: "",
        adminName: "",
        adminEmail: "",
        adminPhone: "",
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
            // await handleRegisterConsortium(consortiumRegister);
            alert("Registro del consorcio exitoso.");
            // router.push("/") Definir donde nos va a pataear una vez creado el consorcio
            setConsortiumRegister(initialData);
        } catch (error: any) {
            console.error(error);
        }
    };

    // Resta hacer las validaciones !!!

    return (
        <div className="flex flex-col items-center w-full p-10 rounded-lg shadow-lg bg-slate-200">
            <h1>El formulario de registro del superadmin</h1>

            <form
                className="flex flex-col w-full max-w-xl"
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Label htmlFor="name">
                    Nombre consorcio:<span className="text-red-600">*</span>
                </Label>
                <Input
                    id="name"
                    name="name"
                    value={consortiumRegister.name}
                    type="text"
                    placeholder="Nombre nuevo consorcio"
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
                    placeholder="Dirección del consorcio"
                    onChange={handleChange}
                />
                <Label htmlFor="email">
                    Email:<span className="text-red-600">*</span>
                </Label>
                <Input
                    id="email"
                    name="email"
                    value={consortiumRegister.email}
                    type="text"
                    placeholder="Correo electrónico del consorcio"
                    onChange={handleChange}
                />
                <Label htmlFor="phone">
                    Teléfono:<span className="text-red-600">*</span>
                </Label>
                <Input
                    id="phone"
                    name="phone"
                    value={consortiumRegister.phone}
                    type="text"
                    placeholder="Teléfono del consorcio"
                    onChange={handleChange}
                />
                <Label htmlFor="adminName">
                    Nombre administrador:<span className="text-red-600">*</span>
                </Label>
                <Input
                    id="adminName"
                    name="adminName"
                    value={consortiumRegister.adminName}
                    type="text"
                    placeholder="Nombre del administrador"
                    onChange={handleChange}
                />
                <Label htmlFor="adminEmail">
                    Email administrador:<span className="text-red-600">*</span>
                </Label>
                <Input
                    id="adminEmail"
                    name="adminEmail"
                    value={consortiumRegister.adminEmail}
                    type="text"
                    placeholder="Correo del administrador"
                    onChange={handleChange}
                />
                <Label htmlFor="adminPhone">
                    Teléfono administrador:
                    <span className="text-red-600">*</span>
                </Label>
                <Input
                    id="adminPhone"
                    name="adminPhone"
                    value={consortiumRegister.adminPhone}
                    type="text"
                    placeholder="Teléfono del administrador"
                    onChange={handleChange}
                />
                <div className="mt-4">
                    <Button
                        type="submit"
                        disabled={
                            consortiumRegister.name === "" ||
                            consortiumRegister.adress === "" ||
                            consortiumRegister.email === "" ||
                            consortiumRegister.phone === "" ||
                            consortiumRegister.adminName === "" ||
                            consortiumRegister.adminEmail === "" ||
                            consortiumRegister.adminPhone === ""
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
