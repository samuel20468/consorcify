import NavbarDashboard from "@/components/NavbarDashboard/NavbarDashboard";
import SideBarUser from "@/components/SideBarUser/SideBarUser";
import { ContainerDashboard } from "@/components/ui";

const Workers = () => {
    return (
        <div>
            <SideBarUser />
            <NavbarDashboard />
            <ContainerDashboard>
                <h1 className="flex items-center justify-center m-auto">
                    Acá van a ir todos los proveedores
                </h1>
            </ContainerDashboard>
        </div>
    );
};
export default Workers;
