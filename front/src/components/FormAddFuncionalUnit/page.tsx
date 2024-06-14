"use client";
import React, { useEffect, useState } from "react";
import { Button, Input, Label } from "../ui";
import { usePathname } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import { validateBalance } from "@/helpers/Validations/validate.balance";
import { validateEmail } from "@/helpers/Validations/validate.email";
import Swal from "sweetalert2";
import { areFieldsNotEmpty } from "@/helpers/Validations/validate.empty";
import { addFuncionalUnit } from "@/helpers/fetch.helper.uf";

const FormAddFuncionalUnit = ({ consortium_id }: { consortium_id: string }) => {
    useAuth();
    const { token, data } = useSesion();
    const initialData = {
        type: "",
        location: "",
        number: "",
        owner: "",
        owner_phone_number: "",
        owner_email: "",
        balance: 0,
        consortium_id: consortium_id,
    };
    const path = usePathname();
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState<{
        type: string;
        location: string;
        number: string;
        owner: string;
        owner_phone_number: string;
        owner_email: string;
        balance: string | number; // Ajuste aquí
    }>({
        type: "",
        location: "",
        number: "",
        owner: "",
        owner_phone_number: "",
        owner_email: "",
        balance: "",
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!areFieldsNotEmpty(formData)) {
            Swal.fire({
                title: "Error",
                text: "Por favor, complete todos los campos",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
            return;
        }

        try {
            const response = await addFuncionalUnit(token, formData);
            if (response) {
                Swal.fire({
                    title: " Unidad Funcional agregada",
                    text: "Unidad Funcional agregada con éxito",
                    icon: "success",
                    confirmButtonText: "Ok",
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Error al agregar el Funcional Unit",
                    icon: "error",
                    confirmButtonText: "Ok",
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]:
                name === "balance"
                    ? value === ""
                        ? 0
                        : parseFloat(value)
                    : value,
        });
    };
    console.log(formData);

    useEffect(() => {
        const validateMail = validateEmail(formData.owner_email);
        setErrors({ ...errors, owner_email: validateMail.email });
    }, [formData]);

    return (
        <div className="flex flex-col items-center justify-center w-1/4 h-full">
            <div className="flex flex-col items-center justify-center my-3 text-xl">
                <h2>Agregar Unidad Funcional</h2>
            </div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center justify-center w-full gap-2"
            >
                <div className="w-full">
                    <Label>Tipo de Unidad:</Label>
                    <select
                        value={formData.type}
                        onChange={handleChange}
                        name="type"
                        id="type"
                        className="w-full h-10 p-2 my-1 text-gray-200 rounded-md shadow-xl bg-input placeholder:font-extralight placeholder:text-gray-500 focus:outline-none no-spinners"
                    >
                        <option value="" disabled>
                            Seleccione un tipo de unidad
                        </option>
                        <option value="Departamento">Departamento</option>
                        <option value="Garaje">Garaje</option>
                        <option value="Espacio Comercial">
                            Espacio Comercial
                        </option>
                        <option value="Oficina">Oficina</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>
                <div className="w-full">
                    <Label>Ubicacion</Label>
                    <Input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full">
                    <Label>Numero</Label>
                    <Input
                        type="number"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full">
                    <Label>Propietario</Label>
                    <Input
                        type="text"
                        name="owner"
                        value={formData.owner}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full">
                    <Label>Teléfono del Propietario</Label>
                    <Input
                        type="text"
                        name="owner_phone_number"
                        value={formData.owner_phone_number}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full">
                    <div className="flex items-center justify-between">
                        <Label>Email del Propietario</Label>
                        {formData.owner_email.trim() !== "" &&
                            errors.owner_email && (
                                <span className="mt-2 text-sm text-red-500">
                                    {errors.owner_email}
                                </span>
                            )}
                    </div>
                    <Input
                        type="text"
                        name="owner_email"
                        placeholder="example@example.com"
                        value={formData.owner_email}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full">
                    <div>
                        <Label>Saldo</Label>
                    </div>
                    <Input
                        type="number"
                        name="balance"
                        step="0.01"
                        value={formData.balance == 0 ? "" : formData.balance}
                        placeholder="Ejemplo: 1000,00"
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full">
                    <Button type="submit" className="w-full py-2 rounded-md">
                        Guardar
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FormAddFuncionalUnit;
