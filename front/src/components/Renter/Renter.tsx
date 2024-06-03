import { Depto } from "@/utils/ufs";
import Link from "next/link";

const Renter = () => {
    return (
        <div className="flex flex-col w-full gap-5 px-12">
            <div className="grid grid-cols-3 gap-3">
                <h1 className="text-lg font-semibold text-center border-b">
                    Piso - Depto
                </h1>
                <h1 className="text-lg font-semibold text-center border-b">
                    Inquilino
                </h1>
                <h1 className="text-lg font-semibold text-center border-b">
                    Deuda
                </h1>
            </div>
            {Depto.map((item) => (
                <Link
                    href="#"
                    className="grid grid-cols-3 gap-3 py-2 text-black bg-gray-300 rounded-lg hover:bg-slate-500"
                >
                    <h1 className="text-lg font-semibold text-center">
                        {item.location} - {item.number}
                    </h1>
                    <h1 className="text-lg font-semibold text-center">
                        {item.owner}
                    </h1>
                    <h1 className="text-lg font-semibold text-center">
                        $ {item.balance}
                    </h1>
                </Link>
            ))}
        </div>
    );
};
export default Renter;
