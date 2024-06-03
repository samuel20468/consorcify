"use client";

import React, { useEffect, useState } from "react";
import { Button, Input, Label } from "../ui";
import {
    IAdmin,
    IConsortium,
    IConsortiumError,
    IUserData,
} from "@/Interfaces/Interfaces";
import { consortiumFetch } from "@/helpers/consortium.helper";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
    getAdmins,
    getConsortiumById,
    updateConsortium,
} from "@/helpers/fetch.helper";
import { validateSuterh } from "@/helpers/Validations/validate.suterh";
import { validateCuit } from "@/helpers/Validations/validate.cuit";

const FormRegisterConsortium = ({ update = false }) => {
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
        c_admin: [] as any[],
    };
    const params: { id: string } = useParams();
    const [userData, setUserData] = useState<IUserData>();
    const [admins, setAdmins] = useState<IAdmin[]>();
    const [token, setToken] = useState<string>("");
    const path = usePathname();
    const [consortiumRegister, setConsortiumRegister] =
        useState<IConsortium>(initialData);
    const [consortiumRegisterError, setConsortiumRegisterError] =
        useState<IConsortiumError>(initialData);
    const router = useRouter();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("userData")!);
        if (data) {
            setToken(data.token);
            setUserData(data.user);
        }
    }, [path]);

    useEffect(() => {
        const fetchConsortium = async () => {
            if (update) {
                try {
                    const response = await getConsortiumById(params.id, token);
                    setConsortiumRegister(response);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        const fetchData = async () => {
            try {
                const response = await getAdmins(token);
                if (response) {
                    setAdmins(response);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fetchData();
            if (update) {
                fetchConsortium();
            }
        }
    }, [token]);

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

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        console.log(name, value);

        setConsortiumRegister({
            ...consortiumRegister,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            !consortiumRegister.building_number ||
            !consortiumRegister.category ||
            !consortiumRegister.city ||
            !consortiumRegister.country ||
            !consortiumRegister.cuit ||
            !consortiumRegister.first_due_day ||
            !consortiumRegister.floors ||
            !consortiumRegister.name ||
            !consortiumRegister.province ||
            !consortiumRegister.street_name ||
            !consortiumRegister.suterh_key ||
            !consortiumRegister.ufs ||
            !consortiumRegister.zip_code
        ) {
            alert("faltan datos en el formulario");
            return;
        }
        console.log(consortiumRegister);
        if (update) {
            try {
                const response = await updateConsortium(
                    params.id,
                    token,
                    consortiumRegister
                );
                if (response?.ok) {
                    alert("Consorcio moficado correctamente");
                    if (userData?.roles?.[0] == "superadmin") {
                        router.push(`/dashboard/consorcios/All/${params.id}`);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                const response = await consortiumFetch(
                    consortiumRegister,
                    token
                );
                if (response?.ok) {
                    alert("Consorcio Creado correctamente");

                    const data = await response.json();
                    console.log(data);
                    if (userData?.roles?.[0] == "superadmin") {
                        router.push(`/dashboard/consorcios/All/${data.id}`);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        const suterhErrors = validateSuterh(consortiumRegister.suterh_key);
        const cuitErrors = validateCuit(consortiumRegister.cuit!);

        setConsortiumRegisterError((prevErrors) => ({
            ...prevErrors,
            ...suterhErrors,
            ...cuitErrors,
        }));
    }, [consortiumRegister]);

    return (
        <div className="w-full h-auto p-4 text-black">
            <div className="flex items-center justify-between px-5">
                <h1 className="mb-2 text-lg font-bold">
                    Consorcios{" "}
                    <span className="text-sm font-normal">
                        |
                        {update
                            ? " Modificar consorcio"
                            : " Crear nuevo Consorcio"}
                    </span>
                </h1>
            </div>
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
                            value={consortiumRegister.suterh_key}
                            onChange={handleChange}
                        />
                        {consortiumRegisterError.suterh_key &&
                            consortiumRegister.suterh_key && (
                                <span className="self-end text-xs text-red-500">
                                    {consortiumRegisterError.suterh_key}
                                </span>
                            )}
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
                            value={consortiumRegister.name}
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
                            value={consortiumRegister.cuit}
                            onChange={handleChange}
                        />
                        {consortiumRegisterError.cuit &&
                            consortiumRegister.cuit && (
                                <span className="self-end text-xs text-red-500">
                                    {consortiumRegisterError.cuit}
                                </span>
                            )}
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
                            value={consortiumRegister.street_name}
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
                            value={
                                consortiumRegister.building_number == 0
                                    ? ""
                                    : consortiumRegister.building_number
                            }
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
                            value={consortiumRegister.country}
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
                            value={consortiumRegister.province}
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
                            value={consortiumRegister.city}
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
                            type="text"
                            placeholder="C1002AAP"
                            value={consortiumRegister.zip_code}
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
                            value={
                                consortiumRegister.floors == 0
                                    ? ""
                                    : consortiumRegister.floors
                            }
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
                            value={
                                consortiumRegister.ufs == 0
                                    ? ""
                                    : consortiumRegister.ufs
                            }
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
                            value={
                                consortiumRegister.category == 0
                                    ? ""
                                    : consortiumRegister.category
                            }
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
                            value={
                                consortiumRegister.first_due_day == 0
                                    ? ""
                                    : consortiumRegister.first_due_day
                            }
                            onChange={handleChange}
                        />
                    </div>
                </div>
                {userData?.roles?.[0] === "superadmin" && (
                    <div>
                        <div className="flex flex-col lg:w-full">
                            <Label>Administrador </Label>
                            <select
                                className="h-10 px-2 text-white rounded-lg bg-input"
                                name="c_admin"
                                id="c-admin"
                                onChange={handleSelect}
                            >
                                {admins?.map((admin) => {
                                    return (
                                        <option key={admin.id} value={admin.id}>
                                            {admin.name} {admin.lastname}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                )}
                <div className="mt-4">
                    <Button type="submit">
                        {update ? "Modificar Consorcio" : "Crear Consorcio"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FormRegisterConsortium;
