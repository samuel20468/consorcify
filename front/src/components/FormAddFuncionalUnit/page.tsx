"use client";

// Estilos y componentes
import { Button, Input, Label, Select } from "../ui";
import Swal from "sweetalert2";

// Iterfaces
import {
    INewFunctionalUnits,
    INewFunctionalUnitsError,
} from "@/Interfaces/functionalUnits.interfaces";

// Validaciones
import { validateEmail } from "@/helpers/Validations/validate.email";
import { areFieldsNotEmpty } from "@/helpers/Validations/validate.empty";

// Endpoints
import { addFuncionalUnit } from "@/helpers/fetch.helper.uf";

// Hooks
import { useEffect, useState } from "react";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";

// -----------------

const FormAddFuncionalUnit = ({ consortium_id }: { consortium_id: string }) => {
    useAuth();
    const { token } = useSesion();
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
    const [formData, setFormData] = useState<INewFunctionalUnits>(initialData);
    const [errors, setErrors] = useState<INewFunctionalUnitsError>({
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
            console.log(response);
            if (response) {
                Swal.fire({
                    title: " Unidad Funcional agregada",
                    text: "Unidad Funcional agregada con éxito",
                    icon: "success",
                    confirmButtonText: "Ok",
                });
                setFormData(initialData);
            } else {
                Swal.fire({
                    title: "Error al agregar la unidad",
                    text: "Intentalo nuevamente o contacta con el administrador",
                    icon: "error",
                    confirmButtonText: "Ok",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error de Información",
                text: (error as Error).message,
            });
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

    useEffect(() => {
        const validateMail = validateEmail(formData.owner_email);
        setErrors({ ...errors, owner_email: validateMail.email });
    }, [formData]);

    return (
        <div className="w-full h-auto p-4 text-white border rounded-[40px]">
            <div className="my-2 text-center">
                <h1 className="mb-2 text-2xl font-bold">
                    Agregar Unidad Funcional
                </h1>
            </div>
            <form
                onSubmit={handleSubmit}
                className="mx-10 my-5"
                autoComplete="off"
            >
                <div className="flex flex-col w-full">
                    <Label htmlFor="type">Tipo de Unidad:</Label>
                    <Select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
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
                    </Select>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col w-1/3">
                        <Label htmlFor="location">Ubicación:</Label>
                        <Input
                            id="location"
                            name="location"
                            type="text"
                            placeholder="Piso 1, Departamento A"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-1/3">
                        <Label htmlFor="number">Número:</Label>
                        <Input
                            id="number"
                            name="number"
                            type="text"
                            placeholder="Nro. UF"
                            value={formData.number}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-1/3">
                        <Label htmlFor="balance">Saldo:</Label>
                        <Input
                            id="balance"
                            name="balance"
                            type="number"
                            step="0.01"
                            placeholder="1500.5"
                            value={
                                formData.balance == 0 ? "" : formData.balance
                            }
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <Label htmlFor="owner">Propietario:</Label>
                    <Input
                        id="owner"
                        name="owner"
                        type="text"
                        placeholder="María López"
                        value={formData.owner}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col w-1/2">
                        <Label htmlFor="owner_email">
                            Email del Propietario:
                        </Label>
                        <Input
                            type="text"
                            name="owner_email"
                            placeholder="maria.lopez@example.com"
                            value={formData.owner_email}
                            onChange={handleChange}
                        />
                        {formData.owner_email.trim() !== "" &&
                            errors.owner_email && (
                                <span className="self-end text-xs text-redd">
                                    {errors.owner_email}
                                </span>
                            )}
                    </div>
                    <div className="flex flex-col w-1/2">
                        <Label htmlFor="owner_phone_number">
                            Teléfono del Propietario:
                        </Label>
                        <Input
                            id="owner_phone_number"
                            name="owner_phone_number"
                            type="text"
                            placeholder="+5491145678901"
                            value={formData.owner_phone_number}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex justify-center mt-5">
                    <Button type="submit" className="w-1/3 py-2 rounded-[40px]">
                        Guardar Unidad Funcional
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FormAddFuncionalUnit;
