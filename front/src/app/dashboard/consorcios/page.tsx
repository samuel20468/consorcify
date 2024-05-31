import NavbarDashboard from "@/components/NavbarDashboard/NavbarDashboard";
import SidebarSuperAdmin from "@/components/SidebarSuperAdmin/SidebarSuperAdmin";
import { Button, ContainerDashboard } from "@/components/ui";
import Link from "next/link";

const ConsorciosCrud = () => {
    return (
        <div className="bg-white h-screen">
            <SidebarSuperAdmin />
            <NavbarDashboard />
            <ContainerDashboard>
                <div className="">
                    <Link href="/addConsortium">
                        <Button>Crear Consorcio</Button>
                    </Link>
                    <Button>Modificar Consorcio</Button>
                    <Button>Ver Consorcio</Button>
                    <Button>Eliminar Consorcio</Button>
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default ConsorciosCrud;
