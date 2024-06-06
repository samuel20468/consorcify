"use client";

// Estilos y componentes
import { Button, Input, Label } from "../ui";
import Swal from "sweetalert2";

// Iterfaces
import { IRegisterAdmin, IRegisterAdminError } from "@/Interfaces/Interfaces";

// Validaciones
import { validateCuit } from "@/helpers/Validations/validate.cuit";
import { validateNombre } from "@/helpers/Validations/validate.name";
import { validateRPA } from "@/helpers/Validations/validate.rpa";
import { validateEmail } from "@/helpers/Validations/validate.email";

// Endpoints
import { adminFetch, getAdminById, updateAdmin } from "@/helpers/fetch.helper";

// Hooks
import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";

// -----------------

const FormRegisterAdmin = ({ update = false }) => {
    useAuth();
    const path = usePathname();
    const router = useRouter();
    const initialData = {
        name: "",
        address: "",
        phone_number: "",
        cuit: "",
        sat: "",
        rpa: "",
        email: "",
    };
    const { token } = useSesion();
    const params: { id: string } = useParams();
    const [adminRegister, setAdminRegister] =
        useState<IRegisterAdmin>(initialData);
    const [errorAdminRegister, setErrorAdminRegister] =
        useState<IRegisterAdminError>(initialData);

    useEffect(() => {
        const fetchData = async () => {
            if (update && !params.id) {
                console.error("El ID del administrador es undefined o vacío");
                return;
            }
            try {
                const response = await getAdminById(params.id, token);
                if (response?.ok) {
                    const data = await response.json();
                    setAdminRegister(data);
                } else {
                    console.error(`Error: ${response?.statusText}`);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (token && update) {
            fetchData();
        }
    }, [token, path]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAdminRegister({
            ...adminRegister,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        if (
            !adminRegister.address ||
            !adminRegister.name ||
            !adminRegister.email ||
            !adminRegister.phone_number ||
            !adminRegister.sat ||
            !adminRegister.rpa ||
            !adminRegister.cuit
        ) {
            alert("faltan datos en el formulario");
            return;
        }
        try {
            if (update == true) {
                const response = await updateAdmin(
                    adminRegister,
                    params.id,
                    token
                );
                if (response) {
                    Swal.fire({
                        title: "Actualizacion exitosa",
                    });
                    router.push(
                        `/dashboard/superadmin/administracion/All/${params.id}`
                    );
                }
            } else {
                const response = await adminFetch(adminRegister, token);
                if (response) {
                    alert("Registro del consorcio exitoso.");
                    router.push(
                        `/dashboard/superadmin/administracion/All/${params.id}`
                    );
                }
            }
            setAdminRegister(initialData);
        } catch (error: any) {
            console.error(error);
        }
    };

    useEffect(() => {
        const nameErrors = validateNombre(adminRegister.name);
        const cuitErrors = validateCuit(adminRegister.cuit!);
        const rpaErrors = validateRPA(adminRegister.rpa);
        const emailErrors = validateEmail(adminRegister.email);

        setErrorAdminRegister((prevErrors) => ({
            ...prevErrors,
            ...nameErrors,
            ...cuitErrors,
            ...rpaErrors,
            ...emailErrors,
        }));
    }, [adminRegister]);

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAdminRegister({
            ...adminRegister,
            [name]: value,
        });
    };

    return (
        <div className="flex flex-col items-center w-full p-10 text-black rounded-lg shadow-lg bg-slate-200">
            <div className="flex items-center justify-center w-full pb-4 text-2xl">
                {update ? (
                    <h1>Formulario de Actualizacion de Administrador</h1>
                ) : (
                    <h1>Formulario de registro de Administrador</h1>
                )}
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
                    value={adminRegister.name}
                    type="text"
                    placeholder="Nombre"
                    onChange={handleChange}
                />
                {errorAdminRegister.name && adminRegister.name && (
                    <span className="self-end text-xs text-red-500">
                        {errorAdminRegister.name}
                    </span>
                )}
                <Label htmlFor="address">
                    Dirección:<span className="text-red-600">*</span>
                </Label>
                <Input
                    id="address"
                    name="address"
                    value={adminRegister.address}
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
                    value={adminRegister.phone_number}
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
                    value={adminRegister.cuit}
                    type="text"
                    placeholder="CUIT sin guiones"
                    onChange={handleChange}
                    disabled={update}
                />
                {errorAdminRegister.cuit && adminRegister.cuit && (
                    <span className="self-end text-xs text-red-500">
                        {errorAdminRegister.cuit}
                    </span>
                )}
                <Label htmlFor="sat">
                    Situación Fiscal:<span className="text-red-600">*</span>
                </Label>
                <select
                    className="h-10 px-2 my-1 text-gray-200 border rounded-md shadow-xl cursor-pointer bg-input focus:outline-none no-spinners"
                    name="sat"
                    id="sat"
                    value={adminRegister.sat}
                    onChange={handleSelect}
                >
                    <option value="" disabled selected>
                        Seleccionar la situación tributaria
                    </option>
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
                    value={adminRegister.rpa}
                    type="text"
                    placeholder="example: 12345"
                    onChange={handleChange}
                    disabled={update}
                />
                {errorAdminRegister.rpa && adminRegister.rpa && (
                    <span className="self-end text-xs text-red-500">
                        {errorAdminRegister.rpa}
                    </span>
                )}
                <Label htmlFor="email">
                    Email:<span className="text-red-600">*</span>
                </Label>
                <Input
                    id="email"
                    name="email"
                    value={adminRegister.email}
                    type="email"
                    placeholder="Correo electrónico"
                    onChange={handleChange}
                    disabled={update}
                />
                {errorAdminRegister.email && adminRegister.email && (
                    <span className="self-end text-xs text-red-500">
                        {errorAdminRegister.email}
                    </span>
                )}

                <div className="mt-4">
                    <Button type="submit">
                        {update
                            ? "Modificar Administrador"
                            : "Registrar Administrador"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FormRegisterAdmin;
