import NavbarDashboard from "@/components/NavbarDashboard/NavbarDashboard";
import SideBarAdmin from "@/components/SidebarAdmin/SideBarAdmin";
import { ContainerDashboard } from "@/components/ui";

const Money = () => {
    return (
        <div>
            <SideBarAdmin />
            <NavbarDashboard />
            <ContainerDashboard>
                <h1 className="flex items-center justify-center m-auto">
                    Acá van a ir toda la plata de la caja que tiene esta
                    administración
                </h1>
            </ContainerDashboard>
        </div>
    );
};

export default Money;
