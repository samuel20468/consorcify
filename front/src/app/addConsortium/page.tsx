import Footer from "@/components/Footer/Footer";
import FormRegisterConsortium from "@/components/FormRegisterConsortium/FormRegisterConsortium";
import NavbarDashboard from "@/components/NavbarDashboard/NavbarDashboard";
import SideBarAdmin from "@/components/SidebarAdmin/SideBarAdmin";
import SideBarSuperAdmin from "@/components/SidebarSuperAdmin/SidebarSuperAdmin";
import { ContainerDashboard } from "@/components/ui";

const AddConsortium = () => {
    return (
        <div className="flex flex-col h-screen">
            <SideBarAdmin />
            {/* <SideBarSuperAdmin /> */}
            <NavbarDashboard />
            <ContainerDashboard>
                <div className="flex items-center justify-center mt-10 bg-white rounded-lg">
                    <FormRegisterConsortium />
                </div>
                <div className="absolute bottom-0 w-[80%] lg:w-[90%]">
                    <Footer />
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default AddConsortium;
