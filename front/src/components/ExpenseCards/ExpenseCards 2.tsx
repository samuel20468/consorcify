// Estilos y componentes
import ExpenseCard from "../ExpenseCard/ExpenseCard";

// Interfaces
import { IExpense } from "@/Interfaces/expenses.interfaces";

// Hooks
import Link from "next/link";

// --------------------

const ExpenseCards = ({ expenses }: { expenses: IExpense[] }) => {
    return (
        <div className="flex flex-col justify-center gap-5 py-5 w-[90%]">
            {expenses?.map((expense) => (
                <Link
                    href={`/dashboard/admin/expenses/${expense.id}`}
                    key={expense.id}
                >
                    <ExpenseCard key={expense.id} {...expense} />
                </Link>
            ))}
        </div>
    );
};

export default ExpenseCards;
