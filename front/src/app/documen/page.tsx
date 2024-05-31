import NavbarDashboard from "@/components/NavbarDashboard/NavbarDashboard";
import SideBarUser from "@/components/SideBarUser/SideBarUser";
import { ContainerDashboard } from "@/components/ui";

const Documents = () => {
    return (
        <div>
            <SideBarUser />
            <NavbarDashboard />
            <ContainerDashboard>
                <h1 className="flex items-center justify-center m-auto">
                    Acá van a ir todos los documentos para el usuario
                </h1>
            </ContainerDashboard>
        </div>
    );
};
export default Documents;
