// Estilos y componentes
import { Button, ContainerDashboard, Title } from "../ui";
import { BsBuildingFillAdd } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";

// Hooks
import Link from "next/link";

// ----------------------

const DashboardSA = () => {
    return (
        <div className="flex items-center justify-center w-full h-screen gap-3 font-sans text-white">
            <ContainerDashboard className="w-full h-full">
                <Title className="flex justify-center">
                    Administración general
                </Title>

                <div className="flex items-center justify-between w-1/2 gap-4 h-3/4">
                    <div className="w-full max-w-sm overflow-hidden bg-[#d3d3d3] rounded-[40px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-6">
                        <div className="flex flex-col items-center p-4 space-y-2">
                            <IoMdPersonAdd size={100} color="black" />
                            <h3 className="text-xl font-bold text-black">
                                Crear un administrador
                            </h3>
                            <p className="text-sm text-center text-black">
                                Agrega un administrador para gestionar
                                operaciones y servicios.
                            </p>
                            <Link href="/addAdministrator">
                                <Button className="py-2 mt-10 font-medium duration-500 rounded-[40px] p-4">
                                    Crear administrador
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="w-full max-w-sm overflow-hidden bg-[#d3d3d3] rounded-[40px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-6">
                        <div className="flex flex-col items-center p-4 space-y-2">
                            <BsBuildingFillAdd size={100} color="black" />
                            <h3 className="text-xl font-bold text-black">
                                Crear un consorcio
                            </h3>
                            <p className="text-sm text-center text-black">
                                Inicia un nuevo consorcio con gestión eficiente
                                y transparente.
                            </p>
                            <Link href="/addConsortium">
                                <Button className="py-2 mt-10 font-medium duration-500 rounded-[40px] p-4">
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
