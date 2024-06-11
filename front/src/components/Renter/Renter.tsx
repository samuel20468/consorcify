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
        </div>
    );
};
export default Renter;
