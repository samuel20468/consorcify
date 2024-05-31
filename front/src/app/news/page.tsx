import NavbarDashboard from "@/components/NavbarDashboard/NavbarDashboard";
import SideBarUser from "@/components/SideBarUser/SideBarUser";
import { ContainerDashboard } from "@/components/ui";

const News = () => {
    return (
        <div>
            <SideBarUser />
            <NavbarDashboard />
            <ContainerDashboard>
                <h1 className="flex items-center justify-center m-auto">
                    Acá van a ir todas las noticias
                </h1>
            </ContainerDashboard>
        </div>
    );
};
export default News;
