// Funciones
import { formatearNumero } from "@/helpers/functions.helper";

// Interfaces
import { ISupplier } from "@/Interfaces/suppliers.interfaces";

// ----------------

const SuppliersCard: React.FC<ISupplier> = ({
    name,
    cuit,
    email,
    phone_number,
    address,
}: ISupplier) => {
    return (
        <div className="flex justify-between py-2 text-center text-black bg-gray-200 rounded-lg hover:bg-slate-400 hover:text-white">
            <div className="w-1/5">
                <h1>{name}</h1>
            </div>
            <div className="w-1/5">
                <h1>{formatearNumero(cuit)}</h1>
            </div>
            <div className="w-1/5">
                <h1>{email}</h1>
            </div>
            <div className="w-1/5">
                <h1>{phone_number}</h1>
            </div>
            <div className="w-1/5">
                <h1>{address}</h1>
            </div>
        </div>
    );
};

export default SuppliersCard;
