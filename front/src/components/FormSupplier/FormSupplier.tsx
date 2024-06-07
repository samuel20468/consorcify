// Estilos y componentes
import { Button, Input, Label, Select } from "../ui";

// Interfaces
import { ISuppliers, ISuppliersError } from "@/Interfaces/Interfaces";

// Endpoints
import { supplierFetch } from "@/helpers/fetch.helper";

// Hooks
import { useState } from "react";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import { useParams, useRouter } from "next/navigation";

// ---------------

const FormSupplier = () => {
    useAuth();
    const { token } = useSesion();
    const router = useRouter();
    const params: { id: string } = useParams();
    const initialData = {
        name: "",
        cuit: "",
        email: "",
        phone_number: "",
        address: "",
        balance: 0,
    };
    const [registerSupplier, setRegisterSupplier] =
        useState<ISuppliers>(initialData);
    const [errorSupplier, setErrorSupplier] =
        useState<ISuppliersError>(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterSupplier({
            ...registerSupplier,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRegisterSupplier({
            ...registerSupplier,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();

        if (
            !registerSupplier.name ||
            !registerSupplier.cuit ||
            !registerSupplier.email ||
            !registerSupplier.phone_number ||
            !registerSupplier.address ||
            !registerSupplier.balance
        ) {
            alert("Faltan datos en el formulario");
            return;
        }
        try {
            const response = await supplierFetch(registerSupplier, token);
            console.log(registerSupplier);

            if (response?.ok) {
                const data = await response.json();
                alert("Registro exitoso");
                setRegisterSupplier(data);
                router.push(`dashboard/admin/portal/suppliers/${data.id}`);
            } else {
                console.error("Error en la solicitud:", response?.statusText);
            }
        } catch (error) {
            console.log("Error en la solicitud:", error);
        }
    };

    return (
        <div className="w-[80%] flex flex-col justify-center">
            <h1 className="mb-4 text-3xl text-center">
                Este es el formulario para agregar un nuevo proveedor
            </h1>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="flex gap-2">
                    <div className="flex flex-col w-2/4">
                        <Label htmlFor="consortium_id">
                            Consorcio:<span className="text-red-600">*</span>
                        </Label>
                        <Select
                            id="consortium_id"
                            name="consortium_id"
                            value={registerSupplier.consortium_id}
                            onChange={handleSelect}
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Seleccione un consorcio
                            </option>
                            <option value="Consorcio 1">Consorcio 1</option>
                            <option value="Consorcio 2">Consorcio 2</option>
                            <option value="Consorcio 3">Consorcio 3</option>
                            <option value="Consorcio 4">Consorcio 4</option>
                            <option value="Consorcio 5">Consorcio 5</option>
                            <option value="Consorcio 6">Consorcio 6</option>
                        </Select>
                    </div>
                    <div className="flex flex-col w-2/4">
                        <Label htmlFor="name">
                            Nombre del proveedor:
                            <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            value={registerSupplier.name}
                            type="text"
                            onChange={handleChange}
                            placeholder="Proveedor Ejemplo SRL"
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="cuit">
                            CUIT:
                            <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="cuit"
                            name="cuit"
                            value={registerSupplier.cuit}
                            type="text"
                            onChange={handleChange}
                            placeholder="11-11111111-1"
                        />
                    </div>
                    <div className="flex flex-col w-3/4">
                        <Label htmlFor="email">
                            Email:
                            <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            value={registerSupplier.email}
                            type="email"
                            onChange={handleChange}
                            placeholder="provedor@mail.com"
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col w-3/4">
                        <Label htmlFor="address">
                            Dirección:
                            <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="address"
                            name="address"
                            value={registerSupplier.address}
                            type="text"
                            onChange={handleChange}
                            placeholder="Calle Falsa 123"
                        />
                    </div>
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="phone_number">
                            Teléfono:
                            <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="phone_number"
                            name="phone_number"
                            value={registerSupplier.phone_number}
                            type="text"
                            onChange={handleChange}
                            placeholder="+541144332211"
                        />
                    </div>
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="balance">
                            Saldo:
                            <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="balance"
                            name="balance"
                            value={
                                registerSupplier.balance == 0
                                    ? ""
                                    : registerSupplier.balance
                            }
                            type="number"
                            onChange={handleChange}
                            placeholder="$2.000"
                        />
                    </div>
                </div>

                <div className="flex justify-center w-full mt-4">
                    <Button className="w-1/4 rounded-[50px] py-2" type="submit">
                        Guardar proveedor
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FormSupplier;
