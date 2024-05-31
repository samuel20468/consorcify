import FormRegisterConsortium from "@/components/FormRegisterConsortium/FormRegisterConsortium";
import NavbarDashboard from "@/components/NavbarDashboard/NavbarDashboard";
import SideBarAdmin from "@/components/SidebarAdmin/SideBarAdmin";
import { ContainerDashboard } from "@/components/ui";

const AddConsortium = () => {
    return (
        <div>
            <SideBarAdmin />
            <NavbarDashboard />
            <ContainerDashboard>
                <FormRegisterConsortium />
            </ContainerDashboard>
        </div>
    );
};

export default AddConsortium;
