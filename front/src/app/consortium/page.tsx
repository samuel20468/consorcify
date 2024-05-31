import NavbarDashboard from "@/components/NavbarDashboard/NavbarDashboard";
import SideBarUser from "@/components/SideBarUser/SideBarUser";
import { ContainerDashboard } from "@/components/ui";

const Consortium = () => {
    return (
        <div>
            <SideBarUser />
            <NavbarDashboard />
            <ContainerDashboard>
                <h1 className="flex items-center justify-center m-auto">
                    Detalles de consorcio del usuario
                </h1>
            </ContainerDashboard>
        </div>
    );
};
export default Consortium;
