"use client";

import SearchBar from "@/components/SearchBar/SearchBar";
import AddExpenses from "@/components/addExpenses/addExpenses";
// Estilos y componentes
import { ContainerDashboard, Title } from "@/components/ui";

// Hooks
import useAuth from "@/helpers/useAuth";

// --------------------

const Expense = () => {
    useAuth();

    const handleSearch = () => {};

    return (
        <ContainerDashboard className="h-[90vh] text-black bg-gray-100 w-[90%]">
            <Title>Expensas</Title>
            <SearchBar onSearch={handleSearch} />
        </ContainerDashboard>
    );
};

export default Expense;
