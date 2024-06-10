// Interfaces
import { IExpenditures } from "@/Interfaces/Interfaces";
import { IoTrashOutline } from "react-icons/io5";

// ----------------

const ExpenditureCard: React.FC<IExpenditures> = ({
    id,
    expense_id,
    supplier_id,
    consortium_id,
    date,
    total_amount,
    status,
    category,
    invoice_number,
    description,
    active,
}: IExpenditures) => {
    return (
        <div className="flex justify-between py-2 text-center text-black bg-gray-200 rounded-lg hover:bg-slate-400 hover:text-white">
            <div className="w-1/5 text-center">
                <h1>{category}</h1>
            </div>
            <div className="w-1/5">
                <h1>Acá va el consorcio</h1>
            </div>
            <div className="w-1/5">
                <h1>Acá va el proveedor</h1>
            </div>
            <div className="w-1/5">
                <h1>{total_amount}</h1>
            </div>
            <div className="w-1/5">
                <div className="flex justify-center">
                    <IoTrashOutline size={20} color="red" />
                </div>
            </div>
        </div>
    );
};

export default ExpenditureCard;
