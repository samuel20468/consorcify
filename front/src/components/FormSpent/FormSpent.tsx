// Estilos y componentes
import { Button, Input, Label, Select } from "../ui";

// Interfaces
import { IExpenditures } from "@/Interfaces/Interfaces";

// Hooks
import { useState } from "react";
import useAuth from "@/helpers/useAuth";

// -------------------

const FormSpent = () => {
    useAuth();
    const initialData = {
        date: "",
        total_amount: 0,
        category: "",
        invoice_number: "",
        description: "",
    };
    const [registerExpenditure, setRegisterExpenditure] =
        useState<IExpenditures>();

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setExpenditure({
    //         ...expenditure,
    //         [name]:
    //     })
    // };

    return (
        <div className="w-[80%] flex flex-col justify-center bg-[#d3d3d3] p-5 rounded-[50px] text-black">
            <h1 className="mb-4 text-3xl text-center">
                Este es el formulario de gastos
            </h1>

            <form
                autoComplete="off"
                // onSubmit={handleSubmit}
            >
                <div className="flex gap-2">
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="date">
                            Fecha:<span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="date"
                            name="date"
                            // value={spent.date}
                            type="date"
                            // onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-2/4">
                        <Label htmlFor="consortium_id">
                            Consorcio:<span className="text-red-600">*</span>
                        </Label>
                        <Select
                            id="consortium_id"
                            name="consortium_id"
                            defaultValue="S"
                            // value={spent.consortium_id}
                            // onChange={handleSelect}
                        >
                            <option value="S" disabled>
                                Seleccionar el consorcio
                            </option>
                        </Select>
                    </div>
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="total_amount">
                            Total:<span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="total_amount"
                            name="total_amount"
                            // value={spent.total_amount}
                            type="number"
                            // onChange={handleChange}
                            placeholder="$400.000"
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col w-3/4">
                        <Label htmlFor="category">
                            Categoria:<span className="text-red-600">*</span>
                        </Label>
                        <Select
                            id="category"
                            name="category"
                            defaultValue="S"
                            // value={spent.category}
                            // onChange={handleSelect}
                        >
                            <option value="S" disabled>
                                Seleccionar la categoría
                            </option>
                            <option value="Servicios Públicos">
                                Servicios Públicos
                            </option>
                            <option value="Abono de Servicios">
                                Abono de Servicios
                            </option>
                            <option value="Mantenimiento de partes comunes">
                                Mantenimiento de partes comunes
                            </option>
                            <option value="Gastos Bancarios">
                                Gastos Bancarios
                            </option>
                            <option value="Gastos de limpieza">
                                Gastos de limpieza
                            </option>
                            <option value="Gastos administrativos">
                                Gastos administrativos
                            </option>
                            <option value="Seguro">Seguro</option>
                            <option value="Sueldos">Sueldos</option>
                            <option value="Otros">Otros</option>
                        </Select>
                    </div>
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="invoice_number">
                            Numero de factura:
                            <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="invoice_number"
                            name="invoice_number"
                            // value={spent.invoice_number}
                            type="number"
                            // onChange={handleChange}
                            placeholder="0000-5678912"
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col w-2/4">
                        <Label htmlFor="supplier_id">
                            Proveedor:<span className="text-red-600">*</span>
                        </Label>
                        <Select
                            id="supplier_id"
                            name="supplier_id"
                            defaultValue="S"
                            // value={spent.supplier_id}
                            // onChange={handleSelect}
                        >
                            <option value="S" disabled>
                                Seleccionar el proveedor
                            </option>
                        </Select>
                    </div>
                    <div className="flex flex-col w-2/4">
                        <Label htmlFor="description">
                            Descripción:<span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="description"
                            name="description"
                            // value={spent.description}
                            type="text"
                            // onChange={handleChange}
                            placeholder="Descripción del servicio prestado"
                        />
                    </div>
                </div>
                <div className="flex justify-center w-full mt-4">
                    <Button className="w-1/4 rounded-[50px] py-2">
                        Guardar gastos
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FormSpent;
