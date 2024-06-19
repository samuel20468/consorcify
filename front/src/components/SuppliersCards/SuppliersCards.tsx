// Estilos y componentes
import SuppliersCard from "../SuppliersCard/SuppliersCard";

// Interfaces

import { ISupplier } from "@/Interfaces/suppliers.interfaces";
interface ISuppliersCardsProps {
    suppliers: ISupplier[];
    roles: string[]; // Nuevo prop roles de tipo string
}

// Hooks
import Link from "next/link";

// --------------------

const SuppliersCards = ({ suppliers, roles }: ISuppliersCardsProps) => {
    return (
        <div className="flex flex-col justify-center gap-5 py-5 w-[90%]">
            {suppliers?.map((supplier) => (
                <Link
                    href={
                        roles?.[0] === "cadmin"
                            ? `/dashboard/admin/portal/suppliers/${supplier.id}`
                            : `/dashboard/usuario/workers/${supplier.id}`
                    }
                    key={supplier.id}
                >
                    <SuppliersCard key={supplier.cuit} {...supplier} />
                </Link>
            ))}
        </div>
    );
};

export default SuppliersCards;
