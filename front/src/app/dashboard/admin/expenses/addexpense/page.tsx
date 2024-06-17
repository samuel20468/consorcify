"use client";

// Estilos y componentes
import { ContainerDashboard, Title } from "@/components/ui";
import AddExpenses from "@/components/addExpenses/addExpenses";

// -----------------------

const addExpense = () => {
    return (
        <div className="h-screen">
            <ContainerDashboard>
                <Title>
                    Expensas{" "}
                    <span className="text-2xl font-thin">| Crear Expensa</span>
                </Title>
                <div className="w-[80%]">
                    <AddExpenses />
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default addExpense;
