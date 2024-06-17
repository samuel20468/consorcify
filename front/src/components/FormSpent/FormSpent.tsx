// Estilos y componentes
import { Button, Input, Label, Select } from "../ui";
import Swal from "sweetalert2";

// Validaciones
import { validateInvoiceNumber } from "@/helpers/Validations/validate.invoice_number";

// Interfaces
import {
    INewExpenditure,
    INewExpenditureError,
} from "@/Interfaces/expenditures.interfaces";
import { IConsortium } from "@/Interfaces/consortium.interfaces";
import { IExpense } from "@/Interfaces/expenses.interfaces";
import { ISupplier } from "@/Interfaces/suppliers.interfaces";

// Endpoints
import { expenditureFetch } from "@/helpers/fetch.helper.expenditure";
import { getConsortiumsByAdminId } from "@/helpers/fetch.helper.consortium";
import { getSuppliers } from "@/helpers/fetch.helper.supplier";
import { getExpenses } from "@/helpers/fetch.helper.expense";

// Hooks
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";

// -------------------

const FormSpent = () => {
    useAuth();
    const { token, data } = useSesion();
    const pathname = usePathname();
    const router = useRouter();
    const initialData = {
        date: "",
        total_amount: 0,
        category: "",
        invoice_number: "",
        description: "",
        expense_id: "",
        supplier_id: "",
        consortium_id: "",
    };
    const [registerExpenditure, setRegisterExpenditure] =
        useState<INewExpenditure>(initialData);
    const [errorRegisterExpenditure, setErrorRegisterExpenditure] =
        useState<INewExpenditureError>(initialData);
    const [consortiums, setConsortiums] = useState<IConsortium[]>([]);
    const [expenses, setExpenses] = useState<IExpense[]>([]);
    const [suppliers, setSuppliers] = useState<ISupplier[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getConsortiumsByAdminId(data.id, token);
                if (response) {
                    const data = await response.json();
                    setConsortiums(data);
                }
            } catch (error) {}
        };
        if (token) {
            fetchData();
        }
    }, [token, pathname]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getExpenses(token);
                if (response) {
                    const data = await response.json();
                    setExpenses(data);
                }
            } catch (error) {}
        };
        if (token) {
            fetchData();
        }
    }, [token, pathname]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getSuppliers(token);
                if (response) {
                    const data = await response.json();
                    setSuppliers(data);
                }
            } catch (error) {}
        };
        if (token) {
            fetchData();
        }
    }, [token, pathname]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setRegisterExpenditure((prevState) => ({
            ...prevState,
            [name]: name === "total_amount" ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            !registerExpenditure.date ||
            !registerExpenditure.consortium_id ||
            !registerExpenditure.expense_id ||
            !registerExpenditure.category ||
            !registerExpenditure.invoice_number ||
            !registerExpenditure.total_amount ||
            !registerExpenditure.supplier_id ||
            !registerExpenditure.description
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
            const response = await expenditureFetch(token, registerExpenditure);
            if (response?.ok) {
                Swal.fire({
                    title: "Excelente",
                    text: `El gasto se creó correctamente`,
                    icon: "success",
                    confirmButtonColor: "#0b0c0d",
                }).then(async (res) => {
                    if (res.isConfirmed) {
                        const data = await response.json();
                        setRegisterExpenditure(data);
                        router.push("/dashboard/admin/spent");
                    }
                });
            } else {
                Swal.fire({
                    title: "Error de información",
                    text: "Los datos que nos proporcionaste son inválidos.",
                    icon: "error",
                    confirmButtonColor: "#0b0c0d",
                });
            }
        } catch (error: any) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        const invoiceNumberErrors = validateInvoiceNumber(
            registerExpenditure.invoice_number
        );

        setErrorRegisterExpenditure((prevErrors) => ({
            ...prevErrors,
            ...invoiceNumberErrors,
        }));
    }, [registerExpenditure]);

    return (
        <div className="w-full h-auto p-4 text-white border rounded-[40px]">
            <div className="text-center my-2">
                <h1 className="mb-2 text-2xl font-bold">Crear nuevo gasto</h1>
            </div>

            <form
                className="mx-10 my-5"
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="date">Fecha:</Label>
                        <Input
                            id="date"
                            name="date"
                            value={registerExpenditure.date}
                            type="date"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-2/4">
                        <Label htmlFor="consortium_id">Consorcio:</Label>
                        <Select
                            id="consortium_id"
                            name="consortium_id"
                            value={registerExpenditure.consortium_id}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Seleccionar el consorcio
                            </option>
                            {consortiums.length > 0 &&
                                consortiums.map((consortium) => (
                                    <option
                                        value={consortium.id}
                                        key={consortium.id}
                                    >
                                        {consortium.name}
                                    </option>
                                ))}
                        </Select>
                    </div>
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="expense_id">Expensa:</Label>
                        <Select
                            id="expense_id"
                            name="expense_id"
                            value={registerExpenditure.expense_id}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Seleccionar la expensa
                            </option>
                            {expenses.length > 0 &&
                                expenses.map((expense) => (
                                    <option value={expense.id} key={expense.id}>
                                        {expense.name}
                                    </option>
                                ))}
                        </Select>
                    </div>
                </div>

                <div className="flex flex-row gap-4">
                    <div className="flex flex-col w-2/4">
                        <Label htmlFor="category">Categoria:</Label>
                        <Select
                            id="category"
                            name="category"
                            value={registerExpenditure.category}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
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
                        </Label>
                        <Input
                            id="invoice_number"
                            name="invoice_number"
                            value={registerExpenditure.invoice_number}
                            type="number"
                            onChange={handleChange}
                            placeholder="00005678912"
                        />
                        {errorRegisterExpenditure.invoice_number &&
                            registerExpenditure.invoice_number && (
                                <span className="self-end text-xs text-red">
                                    {errorRegisterExpenditure.invoice_number}
                                </span>
                            )}
                    </div>
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="total_amount">Total:</Label>
                        <Input
                            id="total_amount"
                            name="total_amount"
                            value={registerExpenditure.total_amount}
                            type="number"
                            onChange={handleChange}
                            placeholder="$400.000"
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col w-2/4">
                        <Label htmlFor="supplier_id">Proveedor:</Label>
                        <Select
                            id="supplier_id"
                            name="supplier_id"
                            value={registerExpenditure.supplier_id}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Seleccionar el proveedor
                            </option>
                            {suppliers.length > 0 &&
                                suppliers.map((supplier) => (
                                    <option
                                        value={supplier.id}
                                        key={supplier.id}
                                    >
                                        {supplier.name}
                                    </option>
                                ))}
                        </Select>
                    </div>
                    <div className="flex flex-col w-2/4">
                        <Label htmlFor="description">Descripción:</Label>
                        <Input
                            id="description"
                            name="description"
                            value={registerExpenditure.description}
                            type="text"
                            onChange={handleChange}
                            placeholder="Descripción del servicio prestado"
                        />
                    </div>
                </div>
                <div className="mt-5 flex justify-center">
                    <Button type="submit" className="w-1/3 py-2 rounded-[40px]">
                        Guardar Gasto
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FormSpent;
