// Stilos y componentes
import { Button, ContainerDashboard, Title } from "../ui";
import { Admin, Building } from "@/helpers/icons.helper";

// Hooks
import Link from "next/link";

const DashboardSA = () => {
    return (
        <div className="flex items-center justify-center w-full h-screen gap-3 text-white font-sans">
            <ContainerDashboard className="w-full h-full bg-[#e5e7eb]">
                <Title className="flex justify-center">
                    Administración general
                </Title>

                <div className="flex items-center justify-between w-1/2 gap-4 h-3/4">
                    <div className="w-full max-w-sm overflow-hidden bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                        <Admin className="h-52 flex justify-center items-center" />
                        <div className="p-4 space-y-2">
                            <h3 className="text-xl font-bold">
                                Crear un administrador
                            </h3>
                            <p className="text-sm text-gray-500">
                                Agrega un administrador para gestionar
                                operaciones y servicios.
                            </p>
                            <Link href="/addAdministrator">
                                <Button className="mt-10 w-full bg-black text-white hover:bg-[#3b3b3b]  rounded-md py-2 font-medium duration-500">
                                    Crear administrador
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="w-full max-w-sm verflow-hidden  bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                        <Building className="h-52 flex justify-center items-center" />
                        <div className="p-4 space-y-2">
                            <h3 className="text-xl font-bold">
                                Crear un consorcio
                            </h3>
                            <p className="text-sm text-gray-500">
                                Inicia un nuevo consorcio con gestión eficiente
                                y transparente.
                            </p>
                            <Link href="/addConsortium">
                                <Button className="mt-10 w-full bg-black text-white hover:bg-[#3b3b3b]  rounded-md py-2 font-medium duration-500">
                                    Crear Consorcio
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default DashboardSA;
