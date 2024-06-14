// Estilos y componentes
import ExpenditureCard from "../ExpenditureCard/ExpenditureCard";

// Interfaces
import { IExpenditure } from "@/Interfaces/expenditures.interfaces";

// Hooks
import Link from "next/link";

// --------------------

const ExpenditureCards = ({
    expenditures,
}: {
    expenditures: IExpenditure[];
}) => {
    return (
        <div className="flex flex-col justify-center gap-5 py-5 w-[90%]">
            {expenditures?.map((expenditure) => (
                <Link
                    href={`/dashboard/admin/spent/${expenditure.id}`}
                    key={expenditure.id}
                >
                    <ExpenditureCard key={expenditure.id} {...expenditure} />
                </Link>
            ))}
        </div>
    );
};

export default ExpenditureCards;
