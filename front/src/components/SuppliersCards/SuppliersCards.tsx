// Estilos y componentes
import { ISupplier } from "@/Interfaces/suppliers.interfaces";
import SuppliersCard from "../SuppliersCard/SuppliersCard";

// Interfaces

// Hooks
import Link from "next/link";

// --------------------

const SuppliersCards = ({ suppliers }: { suppliers: ISupplier[] }) => {
    return (
        <div className="flex flex-col justify-center gap-5 py-5 w-[90%]">
            {suppliers?.map((supplier) => (
                <Link
                    href={`/dashboard/admin/portal/suppliers/${supplier.id}`}
                    key={supplier.id}
                >
                    <SuppliersCard key={supplier.cuit} {...supplier} />
                </Link>
            ))}
        </div>
    );
};

export default SuppliersCards;
