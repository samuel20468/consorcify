import NavbarDashboard from "@/components/NavbarDashboard/NavbarDashboard";
import SideBarAdmin from "@/components/SidebarAdmin/SideBarAdmin";
import { ContainerDashboard } from "@/components/ui";

const Portal = () => {
    return (
        <div>
            <SideBarAdmin />
            <NavbarDashboard />
            <ContainerDashboard>
                <h1 className="flex items-center justify-center m-auto">
                    Acá van a ir el portal para hacer cambios
                </h1>
            </ContainerDashboard>
        </div>
    );
};

export default Portal;
