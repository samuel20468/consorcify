// Estilos y componentes
import ConsorCard from "../ConsorCard/ConsorCard";

// Interfaces
import { IConsortium } from "@/Interfaces/Interfaces";

// Hooks
import Link from "next/link";

// --------------------

const ConsorCards = ({ consortiums }: { consortiums: IConsortium[] }) => {
    return (
        <div className="flex flex-col justify-center gap-5 py-5 w-[90%]">
            {consortiums?.map((consortium) => (
                <Link
                    href={`/dashboard/admin/portal/suppliers/${consortium.id}`}
                    key={consortium.id}
                >
                    <ConsorCard key={consortium.cuit} {...consortium} />
                </Link>
            ))}
        </div>
    );
};

export default ConsorCards;
