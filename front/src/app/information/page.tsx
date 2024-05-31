import NavbarDashboard from "@/components/NavbarDashboard/NavbarDashboard";
import SideBarUser from "@/components/SideBarUser/SideBarUser";
import { ContainerDashboard } from "@/components/ui";

const Information = () => {
    return (
        <div>
            <SideBarUser />
            <NavbarDashboard />
            <ContainerDashboard>
                <h1 className="flex items-center justify-center m-auto">
                    Acá van a ir la información útil para los usuarios
                </h1>
            </ContainerDashboard>
        </div>
    );
};
export default Information;
