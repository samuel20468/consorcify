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
                            defaultValue=""
                            // value={adminRegister.sat}
                            // onChange={handleSelect}
                        >
                            <option value="" disabled>
                                Selecciona el consorcio
                            </option>
                        </Select>

                        <Select
                            name=""
                            id=""
                            defaultValue=""
                            // value={adminRegister.sat}
                            // onChange={handleSelect}
                        >
                            <option value="" disabled>
                                Seleccionar proveedor
                            </option>
                        </Select>

                        <Select
                            name=""
                            id=""
                            defaultValue="S"
                            // value={adminRegister.sat}
                            // onChange={handleSelect}
                        >
                            <option value="S" disabled>
                                Seleccionar el mes
                            </option>
                            <option value="Enero 2024">Enero 2024</option>
                            <option value="Febrero 2024">Febrero 2024</option>
                            <option value="Marzo 2024">Marzo 2024</option>
                            <option value="Abril 2024">Abril 2024</option>
                            <option value="Mayo 2024">Mayo 2024</option>
                            <option value="Junio 2024">Junio 2024</option>
                        </Select>
                    </div>
                    <div className="flex items-end">
                        <Button
                            onClick={handleOnClick}
                            className="py-2 px-4 rounded-[40px]"
                        >
                            Agregar gasto
                        </Button>
                    </div>
                </div>
                <div className="w-[90%] border-t border-b border-white flex justify-between p-2 my-5">
                    <h1>Período</h1>
                    <h1>Consorcio</h1>
                    <h1>Proveedor</h1>
                    <h1>Monto</h1>
                    <h1>Comprobante</h1>
                    <h1>Estado</h1>
                    <h1>Eliminar</h1>
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default Spent;
