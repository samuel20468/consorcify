"use client";
import React, { useEffect, useState } from "react";
import { Button, Input, Label } from "../ui";
import { usePathname } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";

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
        balance: "",
        consortium_id: consortium_id,
    };
    const path = usePathname();
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState(initialData);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    console.log(formData);

    useEffect(() => {}, [formData]);

    return (
        <div className="w-1/4 h-full flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center my-3 text-xl">
                <h2>Agregar Unidad Funcional</h2>
            </div>
            <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col items-center justify-center gap-2"
            >
                <div className="w-full">
                    <Label>tipo:</Label>
                    <select
                        value={formData.type}
                        onChange={handleChange}
                        name="type"
                        id="type"
                        className="w-full h-10 p-2 my-1 text-gray-200 rounded-md shadow-xl bg-input placeholder:font-extralight placeholder:text-gray-500 focus:outline-none no-spinners"
                    >
                        <option value="" selected disabled>
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
                    <Label>Email del Propietario</Label>
                    <Input
                        type="text"
                        name="owner_email"
                        value={formData.owner_email}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full">
                    <Label>Saldo</Label>
                    <Input
                        type="text"
                        name="balance"
                        value={formData.balance}
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
