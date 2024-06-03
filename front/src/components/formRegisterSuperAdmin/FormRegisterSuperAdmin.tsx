"use client";

import { useEffect, useState } from "react";
import { Button, Input, Label } from "../ui";
import { adminFetch } from "@/helpers/form.helper";
import { usePathname, useRouter } from "next/navigation";
import {
    IRegisterConsortium,
    IRegisterConsortiumError,
} from "@/Interfaces/Interfaces";
import { validateCuit } from "@/helpers/Validations/validate.cuit";
import { validateNombre } from "@/helpers/Validations/validate.name";
import { validateRPA } from "@/helpers/Validations/validate.rpa";
import { validateEmail } from "@/helpers/Validations/validate.email";

const FormRegisterSuperAdmin = () => {
    const path = usePathname();
    const router = useRouter();
    const initialData = {
        name: "",
        address: "",
        email: "",
        phone_number: "",
        sat: "",
        rpa: "",
        cuit: "",
    };
    const [token, setToken] = useState<string>("");
    const [consortiumRegister, setConsortiumRegister] =
        useState<IRegisterConsortium>(initialData);

    const [errorConsortiumRegister, setErrorConsortiumRegister] =
        useState<IRegisterConsortiumError>(initialData);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("userData")!);
        if (data) {
            setToken(data.token);
        }
    }, [path, token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConsortiumRegister({
            ...consortiumRegister,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        if (
            !consortiumRegister.address ||
            !consortiumRegister.name ||
            !consortiumRegister.email ||
            !consortiumRegister.phone_number ||
            !consortiumRegister.sat ||
            !consortiumRegister.rpa ||
            !consortiumRegister.cuit
        ) {
            alert("faltan datos en el formulario");
            return;
        }
        try {
            const response = await adminFetch(consortiumRegister, token);
            alert("Registro del consorcio exitoso.");
            console.log(response);
            // router.push("/") Definir donde nos va a pataear una vez creado el consorcio
            setConsortiumRegister(initialData);
        } catch (error: any) {
            console.error(error);
        }
    };

    useEffect(() => {
        const nameErrors = validateNombre(consortiumRegister.name);
        const cuitErrors = validateCuit(consortiumRegister.cuit!);
        const rpaErrors = validateRPA(consortiumRegister.rpa);
        const emailErrors = validateEmail(consortiumRegister.email);

        setErrorConsortiumRegister((prevErrors) => ({
            ...prevErrors,
            ...nameErrors,
            ...cuitErrors,
            ...rpaErrors,
            ...emailErrors,
        }));
    }, [consortiumRegister]);

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setConsortiumRegister({
            ...consortiumRegister,
            [name]: value,
        });
    };

    return (
        <div className="flex flex-col items-center w-full p-10 text-black rounded-lg shadow-lg bg-slate-200">
            <div className="flex items-center justify-center w-full pb-4 text-2xl">
                <h1>Formulario de registro de Administrador</h1>
            </div>

            <form
                className="flex flex-col w-full max-w-xl"
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Label htmlFor="name">
                    Nombre Completo:<span className="text-red-600">*</span>
                </Label>
                <Input
                    id="name"
                    name="name"
                    value={consortiumRegister.name}
                    type="text"
                    placeholder="Nombre"
                    onChange={handleChange}
                />
                {errorConsortiumRegister.name && consortiumRegister.name && (
                    <span className="self-end text-xs text-red-500">
                        {errorConsortiumRegister.name}
                    </span>
                )}
                <Label htmlFor="address">
                    Dirección:<span className="text-red-600">*</span>
                </Label>
                <Input
                    id="address"
                    name="address"
                    value={consortiumRegister.address}
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
                    placeholder="example: +541144332211"
                    onChange={handleChange}
                />
                <Label htmlFor="cuit">
                    CUIT:<span className="text-red-600">*</span>
                </Label>
                <Input
                    id="cuit"
                    name="cuit"
                    value={consortiumRegister.cuit}
                    type="text"
                    placeholder="CUIT sin guiones"
                    onChange={handleChange}
                />
                {errorConsortiumRegister.cuit && consortiumRegister.cuit && (
                    <span className="self-end text-xs text-red-500">
                        {errorConsortiumRegister.cuit}
                    </span>
                )}
                <Label htmlFor="sat">
                    Situación Fiscal:<span className="text-red-600">*</span>
                </Label>
                <select
                    className="h-10 px-2 text-white rounded-lg bg-input"
                    name="sat"
                    id="sat"
                    value={consortiumRegister.sat}
                    onChange={handleSelect}
                >
                    <option value="Monotributo">Monotributo</option>
                    <option value="Responsable Inscripto">
                        Responsable Inscripto
                    </option>
                    <option value="Responsable No Inscripto">
                        Responsable No Inscripto
                    </option>
                    <option value="Exento">Exento</option>
                </select>
                <Label htmlFor="rpa">
                    Inscripción RPA:
                    <span className="text-red-600">*</span>
                </Label>
                <Input
                    id="rpa"
                    name="rpa"
                    value={consortiumRegister.rpa}
                    type="text"
                    placeholder="example: 12345"
                    onChange={handleChange}
                />
                {errorConsortiumRegister.rpa && consortiumRegister.rpa && (
                    <span className="self-end text-xs text-red-500">
                        {errorConsortiumRegister.rpa}
                    </span>
                )}
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
                {errorConsortiumRegister.email && consortiumRegister.email && (
                    <span className="self-end text-xs text-red-500">
                        {errorConsortiumRegister.email}
                    </span>
                )}

                <div className="mt-4">
                    <Button type="submit">Registrar</Button>
                </div>
            </form>
        </div>
    );
};

export default FormRegisterSuperAdmin;
