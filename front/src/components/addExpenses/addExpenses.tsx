'use client';

// Estilos y componentes
import { Button, Input, Label, Select } from '../ui';
import Swal from 'sweetalert2';

// Endpoints
import { expenseFetch } from '@/helpers/fetch.helper.expense';
import { getConsortiumsByAdminId } from '@/helpers/fetch.helper.consortium';

// Interfaces
import { IConsortium } from '@/Interfaces/consortium.interfaces';
import { INewExpense } from '@/Interfaces/expenses.interfaces';

// Hooks
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useAuth from '@/helpers/useAuth';
import useSesion from '@/helpers/useSesion';
import { validateIssue } from '@/helpers/Validations/validate.dates';

// ------------------------

const AddExpenses = () => {
    useAuth();
    const path = usePathname();
    const router = useRouter();
    const { token, data } = useSesion();
    const initialData = {
        issue_date: '',
        expiration_date: '',
        consortium_id: '',
        name: '',
    };
    const [expense, setExpense] = useState<INewExpense>(initialData);
    const [consortiums, setconsortiums] = useState<IConsortium[]>([]);
    const [errorExpense, setErrorExpense] = useState<INewExpense>(initialData);
    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);
    const maxDate = new Date(firstDayOfMonth);
    maxDate.setMonth(maxDate.getMonth() + 2);
    maxDate.setDate(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getConsortiumsByAdminId(data.id, token);
                if (response) {
                    const data = await response.json();
                    setconsortiums(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fetchData();
        }
    }, [token, path]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        console.log(value);

        setExpense((prevExpense) => ({
            ...prevExpense,
            [name]: value,
        }));
    };

    useEffect(() => {
        const dateErrors = validateIssue(
            expense.issue_date,
            expense.expiration_date
        );

        setErrorExpense((prevErrors) => ({
            ...prevErrors,
            ...dateErrors,
        }));
    }, [expense]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!expense.expiration_date || !expense.consortium_id) {
            Swal.fire({
                icon: 'error',
                title: 'Por favor completa todos los campos',
            });
            return;
        }
        if (Object.keys(errorExpense).length > 0) {
            Swal.fire({
                icon: 'error',
                title: 'Corrige los campos por favor',
            });
            return;
        }

        try {
            const response = await expenseFetch(token, expense);
            if (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Expensa creada correctamente',
                }).then((resp) => {
                    if (resp.isConfirmed) {
                        router.push('/dashboard/admin/expenses');
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Hubo error al crear la Expensa',
                            text: 'Intentato mas trade',
                        });
                        return;
                    }
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error de información',
                text: (error as Error).message,
                icon: 'error',
                confirmButtonColor: '#0b0c0d',
            });
        }
    };

    return (
        <div className="w-full h-auto p-4 text-white border rounded-[40px]">
            <div className="text-center my-2">
                <h3 className="mb-2 text-2xl font-boldk">Nueva Expensa </h3>
            </div>
            <form
                className="mx-10 my-5"
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col w-2/4">
                        <Label htmlFor="issue_date">Fecha de inicio:</Label>
                        <Input
                            type="date"
                            name="issue_date"
                            id="issue_date"
                            min={firstDayOfMonth.toISOString().split('T')[0]}
                            max={maxDate.toISOString().split('T')[0]}
                            value={expense.issue_date}
                            onChange={handleChange}
                        />
                        {errorExpense.issue_date && expense.issue_date && (
                            <span className="self-end text-xs text-redd">
                                {errorExpense.issue_date}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col w-2/4">
                        <Label htmlFor="expiration_date">
                            Fecha de cierre:
                        </Label>
                        <Input
                            type="date"
                            name="expiration_date"
                            id="expiration_date"
                            min={expense.issue_date}
                            max={maxDate.toISOString().split('T')[0]}
                            value={expense.expiration_date}
                            onChange={handleChange}
                        />
                        {errorExpense.expiration_date &&
                            expense.expiration_date && (
                                <span className="self-end text-xs text-redd">
                                    {errorExpense.expiration_date}
                                </span>
                            )}
                    </div>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col w-2/4">
                        <Label htmlFor="name">Nombre de expensa:</Label>
                        <Input
                            name="name"
                            id="name"
                            type="text"
                            placeholder="Expensa de Junio"
                            value={expense.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-2/4">
                        <Label htmlFor="consortium_id">Consorcio:</Label>
                        <Select
                            value={expense.consortium_id}
                            onChange={handleChange}
                            name="consortium_id"
                            id="consortium_id"
                        >
                            <option value="" disabled>
                                Elija un Consorcio
                            </option>
                            {consortiums.length !== 0 &&
                                consortiums.map((consortium) => (
                                    <option
                                        key={consortium.id}
                                        value={consortium.id}
                                    >
                                        {consortium.name}
                                    </option>
                                ))}
                        </Select>
                    </div>
                </div>
                <div className="mt-5 flex justify-center">
                    <Button type="submit" className="w-1/3 py-2 rounded-[40px]">
                        Crear Expensa
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddExpenses;
