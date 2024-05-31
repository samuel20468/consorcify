import ConsortiumsAdmin from "@/components/ConsortiumAdmin/ConsortiumAdmin";
import NavbarDashboard from "@/components/NavbarDashboard/NavbarDashboard";
import SideBarAdmin from "@/components/SidebarAdmin/SideBarAdmin";
import { ContainerDashboard } from "@/components/ui";

const Consortium = () => {
    return (
        <div>
            <SideBarAdmin />
            <NavbarDashboard />
            <ContainerDashboard>
                <ConsortiumsAdmin />
            </ContainerDashboard>
        </div>
    );
};

export default Consortium;
