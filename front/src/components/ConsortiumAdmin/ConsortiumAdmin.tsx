"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui";

const ConsortiumsAdmin = () => {
    const router = useRouter();

    const navegar = () => {
        router.push("/addConsortium");
    };

    return (
        <div className="w-full h-auto p-4">
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between h-12 px-2 bg-red-200 rounded-lg hover:bg-red-300 hover:cursor-pointer hover:font-bold">
                    Consorcio 1
                </div>
                <div className="flex items-center justify-between h-12 px-2 bg-red-200 rounded-lg hover:bg-red-300 hover:cursor-pointer hover:font-bold">
                    <h1>Consorcio 2</h1>
                    <h1>$2.000.000</h1>
                </div>
                <div className="flex items-center justify-between h-12 px-2 bg-red-200 rounded-lg hover:bg-red-300 hover:cursor-pointer hover:font-bold">
                    Consorcio 3
                </div>
                <div className="flex items-center justify-between h-12 px-2 bg-red-200 rounded-lg hover:bg-red-300 hover:cursor-pointer hover:font-bold">
                    Consorcio 4
                </div>
                <div className="flex items-center justify-between h-12 px-2 bg-red-200 rounded-lg hover:bg-red-300 hover:cursor-pointer hover:font-bold">
                    Consorcio 5
                </div>
            </div>
            <div className="flex justify-center w-full mt-4">
                <Button onClick={navegar}>Agregar consorcio</Button>
            </div>
        </div>
    );
};

export default ConsortiumsAdmin;
