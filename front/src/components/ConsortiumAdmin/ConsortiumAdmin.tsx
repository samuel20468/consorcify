"use client";

// Estilos y componentes
import { Button } from "../ui";

// Hooks
import { useRouter } from "next/navigation";
import useAuth from "@/helpers/useAuth";

const ConsortiumsAdmin = () => {
    useAuth();
    const router = useRouter();

    const navegar = () => {
        router.push("/addConsortium");
    };

    return (
        <div className="w-full h-auto p-4">
            <div className="flex flex-col gap-2">
                <div className="flex justify-center gap-4">
                    <div className="flex items-center justify-between w-5/6 h-12 px-2 bg-red-200 rounded-lg hover:bg-red-300 hover:cursor-pointer hover:font-bold">
                        <h1>Consorcio 1</h1>
                        <h1>$35.000</h1>
                    </div>
                    <div className="flex items-center">
                        <Button>Generar expensa</Button>
                    </div>
                </div>
                <div className="flex justify-center gap-4">
                    <div className="flex items-center justify-between w-5/6 h-12 px-2 bg-red-200 rounded-lg hover:bg-red-300 hover:cursor-pointer hover:font-bold">
                        <h1>Consorcio 2</h1>
                        <h1>$11.565.070</h1>
                    </div>
                    <div className="flex items-center">
                        <Button>Generar expensa</Button>
                    </div>
                </div>
                <div className="flex justify-center gap-4">
                    <div className="flex items-center justify-between w-5/6 h-12 px-2 bg-red-200 rounded-lg hover:bg-red-300 hover:cursor-pointer hover:font-bold">
                        <h1>Consorcio 3</h1>
                        <h1>$0</h1>
                    </div>
                    <div className="flex items-center">
                        <Button>Generar expensa</Button>
                    </div>
                </div>
                <div className="flex justify-center gap-4">
                    <div className="flex items-center justify-between w-5/6 h-12 px-2 bg-red-200 rounded-lg hover:bg-red-300 hover:cursor-pointer hover:font-bold">
                        <h1>Consorcio 4</h1>
                        <h1>$948.154</h1>
                    </div>
                    <div className="flex items-center">
                        <Button>Generar expensa</Button>
                    </div>
                </div>
                <div className="flex justify-center gap-4">
                    <div className="flex items-center justify-between w-5/6 h-12 px-2 bg-red-200 rounded-lg hover:bg-red-300 hover:cursor-pointer hover:font-bold">
                        <h1>Consorcio 5</h1>
                        <h1>$40.000.000</h1>
                    </div>
                    <div className="flex items-center">
                        <Button>Generar expensa</Button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center w-full mt-4">
                <Button onClick={navegar}>Agregar consorcio</Button>
            </div>
        </div>
    );
};

export default ConsortiumsAdmin;
