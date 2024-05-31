"use client";

import React, { useState } from "react";
import { Button, Input, Label } from "../ui";
import { IConsortium, IConsortiumError } from "@/Interfaces/Interfaces";
import { consortiumFetch } from "@/helpers/consortium.helper";
import { useRouter } from "next/navigation";

const FormRegisterConsortium = () => {
    const initialData = {
        suterh_key: "",
        name: "",
        cuit: "",
        street_name: "",
        building_number: 0,
        zip_code: "",
        country: "",
        province: "",
        city: "",
        floors: 0,
        ufs: 0,
        category: 0,
        first_due_day: 0,
    };
    const router = useRouter();

    const [consortiumRegister, setConsortiumRegister] =
        useState<IConsortium>(initialData);

    const [consortiumRegisterError, setConsortiumRegisterError] =
        useState<IConsortiumError>(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setConsortiumRegister({
            ...consortiumRegister,
            [name]:
                name === "building_number" ||
                name === "floors" ||
                name === "ufs" ||
                name === "category" ||
                name === "first_due_day"
                    ? Number(value)
                    : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await consortiumFetch(consortiumRegister);
            if (response?.ok) {
                alert("Consorcio creado correctamente");
                router.push("/consortiums");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full h-auto p-4">
            <h1 className="mb-2 text-lg font-bold">
                Consorcios{" "}
                <span className="text-sm font-normal">
                    | Registro de nuevo consorcio
                </span>
            </h1>
            <form
                className="mx-10 my-5"
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col lg:w-1/4">
                        <Label htmlFor="suterh_key">
                            Clave SUTERH:<span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="suterh_key"
                            name="suterh_key"
                            type="text"
                            placeholder="12345/01"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col lg:w-1/2">
                        <Label htmlFor="name">
                            Razon Social:<span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Consorcio Edificio Rivadavia 456"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col lg:w-1/4">
                        <Label htmlFor="cuit">
                            CUIT:<span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="cuit"
                            name="cuit"
                            type="cuit"
                            placeholder="30030345670"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex flex-row gap-4 ">
                    <div className="flex flex-col lg:w-3/4">
                        <Label htmlFor="street_name">
                            Dirección:<span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="street_name"
                            name="street_name"
                            type="text"
                            placeholder="Av. Rivadavia"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col lg:w-1/4">
                        <Label htmlFor="building_number">
                            Altura:<span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="building_number"
                            name="building_number"
                            type="number"
                            placeholder="456"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex flex-row gap-4">
                    <div className="flex flex-col lg:w-1/4">
                        <Label htmlFor="country">
                            País:<span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="country"
                            name="country"
                            type="text"
                            placeholder="Argentina"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col lg:w-1/4">
                        <Label htmlFor="province">
                            Provincia:<span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="province"
                            name="province"
                            type="text"
                            placeholder="CABA"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col lg:w-1/4">
                        <Label htmlFor="city">
                            Ciudad:<span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="city"
                            name="city"
                            type="text"
                            placeholder="CABA"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col lg:w-1/4">
                        <Label htmlFor="zip_code">
                            Código postal:
                            <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="zip_code"
                            name="zip_code"
                            type="string"
                            placeholder="C1002AAP"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex flex-row gap-4">
                    <div className="flex flex-col lg:w-1/4">
                        <Label htmlFor="floors">
                            Cantidad de pisos:
                            <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="floors"
                            name="floors"
                            type="number"
                            placeholder="5"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col lg:w-1/4">
                        <Label htmlFor="ufs">
                            Cantidad UF's:
                            <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="ufs"
                            name="ufs"
                            type="number"
                            placeholder="17"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col lg:w-1/4">
                        <Label htmlFor="category">
                            Categoría edificio:
                            <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="category"
                            name="category"
                            type="number"
                            placeholder="1"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col lg:w-1/4">
                        <Label htmlFor="first_due_day">
                            Primer vencimiento:
                            <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="first_due_day"
                            name="first_due_day"
                            type="number"
                            placeholder="10"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <Button type="submit">Crear Consorcio</Button>
                </div>
            </form>
        </div>
    );
};

export default FormRegisterConsortium;