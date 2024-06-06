// Stilos y componentes
import { Button, ContainerDashboard, Title } from "../ui";
import { AllAdmins, AllConsortium } from "@/helpers/icons.helper";

// Hooks
import Link from "next/link";

const DashboardSA = () => {
    return (
        <div className="flex items-center justify-center w-full h-screen gap-3 bg-[#e5e7eb] text-black">
            <ContainerDashboard className="w-full h-full bg-[#e5e7eb]">
                <Title>Administración general</Title>
                <div className="flex items-center justify-between w-1/2 gap-4 h-3/4">
                    <div className="flex flex-col items-center  w-1/2 py-2 border rounded-[50px] h-3/4 bg-[#dadada] shadow-2xl">
                        <AllAdmins className="flex items-center justify-center w-full h-full" />
                        <Link
                            href="/addAdministrator"
                            className="w-[80%] px-2 "
                        >
                            <Button>Crear Administración</Button>
                        </Link>
                    </div>
                    <div className="flex flex-col items-center  w-1/2 py-2 border rounded-[50px] h-3/4 bg-[#dadada] shadow-2xl">
                        <AllConsortium className="flex items-center justify-center w-full h-full" />
                        <Link href="/addConsortium" className="w-[80%] px-2 ">
                            <Button>Crear Consorcio</Button>
                        </Link>
                    </div>
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default DashboardSA;
