import { IExpense } from '@/Interfaces/expenses.interfaces';
import { formatDate, formatMoney } from '@/helpers/functions.helper';
import React from 'react';

const ExpenseDetailAdmin = (expense: IExpense) => {
    return (
        <div className="w-full flex flex-col bg-neutral-100 rounded-[40px] p-10">
            <div className="w-full flex items-start text-blackk border-b-2 border-blackk pb-5">
                <div className="w-1/2 bg-inherit flex flex-col justify-around mx-2 border-r border-blackk">
                    <h3 className="py-1 mb-2 text-xl">
                        <span className="font-semibold">Expensas: </span>
                        {''} {expense.name}
                    </h3>
                    <h3 className="py-3 text-xl">
                        <span className="font-semibold">Emisión: </span>
                        {''} {expense.issue_date}
                    </h3>
                    <h3 className="py-3 text-xl">
                        <span className="font-semibold">Expiración: </span>
                        {''}
                        {expense.expiration_date}
                    </h3>
                </div>
                <div className="w-1/2 flex flex-col mx-2 uppercase font-light">
                    <h3 className="pb-1">{expense.consortium.name}</h3>
                    <h3 className="py-1">CUIT: {expense.consortium.cuit}</h3>
                    <h3 className="py-1">
                        {expense.consortium.street_name}{' '}
                        {expense.consortium.building_number}{' '}
                        {expense.consortium.city} {expense.consortium.province}{' '}
                    </h3>
                    <h3 className="py-1">
                        Categoría: {expense.consortium.category}
                    </h3>
                    <h3 className="pt-1">
                        Unidades Funcionales: {expense.consortium.ufs}
                    </h3>
                </div>
            </div>
            <div>
                <div className="text-center text-black text-2xl p-3 ">
                    <h3>Listado de Gastos</h3>
                </div>
                <div>
                    <div className="flex justify-center w-full text-blackk border-b-2 border-blackk py-2">
                        <p className="flex items-center justify-center w-1/5">
                            Categoría
                        </p>
                        <p className="flex items-center justify-center w-1/5">
                            Proveedor
                        </p>
                        <p className="flex items-center justify-center w-1/5">
                            Fecha
                        </p>
                        <p className="flex items-center justify-center w-1/5">
                            Descripción
                        </p>
                        <p className="flex items-center justify-center w-1/5">
                            Total
                        </p>
                    </div>
                </div>
                <div
                    className="w-full
                    flex flex-col  gap-2"
                >
                    {expense.expenditures.map((expenditure) => (
                        <div
                            key={expenditure.id}
                            className="text-blackk w-full border-b border-gray-600 flex items-center py-3"
                        >
                            <p className="flex items-center justify-center w-1/5">
                                {expenditure.category}
                            </p>
                            <p className="flex text-blackk items-center justify-center w-1/5 uppercase text-[1.1rem]">
                                {expenditure.supplier.name}
                            </p>
                            <p className="flex items-center justify-center w-1/5">
                                {formatDate(expenditure.date)}
                            </p>
                            <p className="flex items-center justify-center w-1/5">
                                {expenditure.description}
                            </p>
                            <p className="flex items-center justify-center w-1/5">
                                {formatMoney(expenditure.total_amount)}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="mt-5 border-t-2 border-blackk py-5">
                    <div className="flex text-blackk justify-between">
                        <h3 className="">Total de Gastos</h3>
                        <p>{expense.total_amount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpenseDetailAdmin;
