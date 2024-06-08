"use client";

// Estilos y componentes
import { Button, ContainerDashboard, Select, Title } from "@/components/ui";

// Hooks
import useAuth from "@/helpers/useAuth";
import { useRouter } from "next/navigation";

// ------------------

const Spent = () => {
    useAuth();
    const router = useRouter();

    const handleOnClick = () => {
        router.push("/addSpent");
    };

    return (
        <div className="h-screen text-white">
            <ContainerDashboard>
                <Title>Gastos</Title>
                <div className="flex justify-between w-[95%]">
                    <div className="flex justify-start gap-3">
                        <Select
                            name=""
                            id=""
                            // value={adminRegister.sat}
                            // onChange={handleSelect}
                        >
                            <option value="" disabled selected>
                                Seleccionar consorcio
                            </option>
                            <option value="">Consorcio 1</option>
                            <option value="">Consorcio 2</option>
                            <option value="">Consorcio 3</option>
                            <option value="">Consorcio 4</option>
                        </Select>

                        <Select
                            name=""
                            id=""
                            // value={adminRegister.sat}
                            // onChange={handleSelect}
                        >
                            <option value="" disabled selected>
                                Seleccionar proveedor
                            </option>
                            <option value="">Proveedor 1</option>
                            <option value="">Proveedor 2</option>
                            <option value="">Proveedor 3</option>
                            <option value="">Proveedor 4</option>
                            <option value="">Proveedor 5</option>
                            <option value="">Proveedor 6</option>
                            <option value="">Proveedor 7</option>
                        </Select>

                        <Select
                            name=""
                            id=""
                            // value={adminRegister.sat}
                            // onChange={handleSelect}
                        >
                            <option value="" disabled selected>
                                Seleccionar el mes
                            </option>
                            <option value="">Enero 2024</option>
                            <option value="">Febrero 2024</option>
                            <option value="">Marzo 2024</option>
                            <option value="">Abril 2024</option>
                            <option value="">Mayo 2024</option>
                            <option value="">Junio 2024</option>
                        </Select>
                    </div>
                    <div className="flex items-center ">
                        <Button
                            onClick={handleOnClick}
                            className="text-white bg-gray-900 w-[40px] h-[40px] rounded-full text-4xl"
                        >
                            +
                        </Button>
                    </div>
                </div>
                <div className="w-[90%] border-t border-black flex justify-between pt-2 my-3">
                    <h1>Período</h1>
                    <h1>Consorcio</h1>
                    <h1>Proveedor</h1>
                    <h1>Monto</h1>
                    <h1>Comprobante</h1>
                    <h1>Estado</h1>
                    <h1>Eliminar</h1>
                </div>
                <div className="flex items-center w-[95%] flex-col gap-2">
                    <div className="flex items-center justify-center w-full h-12 bg-gray-400 rounded-3xl">
                        Gasto 1
                    </div>
                    <div className="flex items-center justify-center w-full h-12 bg-gray-400 rounded-3xl">
                        Gasto 2
                    </div>
                    <div className="flex items-center justify-center w-full h-12 bg-gray-400 rounded-3xl">
                        Gasto 3
                    </div>
                    <div className="flex items-center justify-center w-full h-12 bg-gray-400 rounded-3xl">
                        Gasto 4
                    </div>
                    <div className="flex items-center justify-center w-full h-12 bg-gray-400 rounded-3xl">
                        Gasto 5
                    </div>
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default Spent;
