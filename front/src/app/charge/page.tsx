import NavbarDashboard from "@/components/NavbarDashboard/NavbarDashboard";
import SideBarAdmin from "@/components/SidebarAdmin/SideBarAdmin";
import { ContainerDashboard } from "@/components/ui";

const Charge = () => {
    return (
        <div>
            <SideBarAdmin />
            <NavbarDashboard />
            <ContainerDashboard>
                <h1 className="flex items-center justify-center m-auto">
                    Acá van a ir todas las cobranzas que tiene esta
                    administración
                </h1>
            </ContainerDashboard>
        </div>
    );
};

export default Charge;
