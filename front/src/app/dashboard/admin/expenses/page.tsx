"use client";

import AddExpenses from "@/components/addExpenses/addExpenses";
// Estilos y componentes
import { ContainerDashboard, Title } from "@/components/ui";

// Hooks
import useAuth from "@/helpers/useAuth";

// --------------------

const Claim = () => {
    useAuth();

    return (
        <ContainerDashboard className="h-[90vh] text-black bg-gray-100 w-[90%]">
            <Title>Expensas</Title>
        </ContainerDashboard>
    );
};

export default Claim;
