import { ContainerDashboard } from "@/components/ui";
import React from "react";
import AddExpenses from "@/components/addExpenses/addExpenses";

const addExpense = () => {
    return (
        <ContainerDashboard className="w-[90%] h-[90vh] bg-gray-50">
            <AddExpenses />
        </ContainerDashboard>
    );
};

export default addExpense;
