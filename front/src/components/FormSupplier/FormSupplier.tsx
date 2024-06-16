// Estilos y componentes
import { Button, Input, Label, Select } from "../ui";
import Swal from "sweetalert2";

// Validaciones
import { validateCuit } from "@/helpers/Validations/validate.cuit";

// Interfaces
import {
    INewSupplier,
    INewSupplierError,
} from "@/Interfaces/suppliers.interfaces";
import { IConsortium } from "@/Interfaces/consortium.interfaces";

// Endpoints
import { getConsortiumsByAdminId } from "@/helpers/fetch.helper.consortium";
import { supplierFetch } from "@/helpers/fetch.helper.supplier";

// Hooks
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";

// ---------------

const FormSupplier = () => {
    useAuth();
    const { token, data } = useSesion();
    const pathname = useParams();
    const router = useRouter();
    const initialData = {
        name: "",
        cuit: "",
        email: "",
        phone_number: "",
        address: "",
        balance: 0,
        consortium_id: "",
    };
    const [registerSupplier, setRegisterSupplier] =
        useState<INewSupplier>(initialData);
    const [errorSupplier, setErrorSupplier] =
        useState<INewSupplierError>(initialData);
    const [consortiums, setConsortiums] = useState<IConsortium[]>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterSupplier({
            ...registerSupplier,
            [name]:
                name === "balance"
                    ? value === ""
                        ? ""
                        : Number(value)
                    : value,
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
            !registerSupplier.balance === undefined
        ) {
            Swal.fire({
                title: "Formulario incompleto",
                text: "Asegúrate de completar todos los campos del formulario.",
                icon: "error",
                confirmButtonColor: "#0b0c0d",
            });
            return;
        }

        try {
            const response = await supplierFetch(registerSupplier, token);
            if (response?.ok) {
                Swal.fire({
                    title: "Excelente",
                    text: `El proveedor ${registerSupplier.name} se creó correctamente`,
                    icon: "success",
                    confirmButtonColor: "#0b0c0d",
                }).then(async (res) => {
                    if (res.isConfirmed) {
                        const data = await response.json();
                        setRegisterSupplier(data);
                        router.push(
                            `dashboard/admin/portal/suppliers/${data.id}`
                        );
                    }
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error de información",
                text: "Los datos que nos proporcionaste son inválidos.",
                icon: "error",
                confirmButtonColor: "#0b0c0d",
            });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getConsortiumsByAdminId(data.id, token);
                if (response) {
                    const data = await response.json();
                    setConsortiums(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fetchData();
        }
    }, [token, pathname]);

    useEffect(() => {
        const cuitErrors = validateCuit(registerSupplier.cuit);
        setErrorSupplier((prevErrors) => ({
            ...prevErrors,
            ...cuitErrors,
        }));
    }, [registerSupplier]);

    return (
        <div className="w-full h-auto p-4 text-white border rounded-[40px]">
            <div className="my-2 text-center">
                <h1 className="mb-2 text-2xl font-bold">
                    Agregar Nuevo Proveedor
                </h1>
            </div>
            <form
                className="mx-10 my-5"
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col w-2/4">
                        <Label htmlFor="consortium_id">Consorcio:</Label>
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
                            {consortiums &&
                                consortiums.map((consortium) => {
                                    return (
                                        <option
                                            key={consortium.id}
                                            value={consortium.id}
                                        >
                                            {consortium.name}
                                        </option>
                                    );
                                })}
                        </Select>
                    </div>
                    <div className="flex flex-col w-2/4">
                        <Label htmlFor="name">Nombre del proveedor:</Label>
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

                <div className="flex flex-row gap-4">
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="cuit">CUIT:</Label>
                        <Input
                            id="cuit"
                            name="cuit"
                            value={registerSupplier.cuit}
                            type="text"
                            onChange={handleChange}
                            placeholder="11-11111111-1"
                        />
                        {errorSupplier.cuit && registerSupplier.cuit && (
                            <span className="self-end text-xs text-red">
                                {errorSupplier.cuit}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col w-3/4">
                        <Label htmlFor="email">Email:</Label>
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

                <div className="flex flex-row gap-4">
                    <div className="flex flex-col w-3/4">
                        <Label htmlFor="address">Dirección:</Label>
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
                        <Label htmlFor="phone_number">Teléfono:</Label>
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
                        <Label htmlFor="balance">Saldo:</Label>
                        <Input
                            id="balance"
                            name="balance"
                            value={
                                registerSupplier.balance === 0
                                    ? ""
                                    : registerSupplier.balance
                            }
                            type="number"
                            onChange={handleChange}
                            placeholder="$2.000"
                        />
                    </div>
                </div>

                <div className="flex justify-center w-full mt-5">
                    <Button className="w-1/3 py-2 rounded-[40px]" type="submit">
                        Guardar proveedor
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FormSupplier;
