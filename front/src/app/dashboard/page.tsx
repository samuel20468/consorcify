import NavbarDashboard from "@/components/NavbarDashboard/NavbarDashboard";
import SideBarUser from "@/components/SideBarUser/SideBarUser";
import SideBarAdmin from "@/components/SidebarAdmin/SideBarAdmin";
import { ContainerDashboard } from "@/components/ui";
import React from "react";

const Dashboard = () => {
    return (
        <div>
            <SideBarAdmin />
            {/* <SideBarUser /> */}
            <NavbarDashboard />
            <ContainerDashboard>
                <div>Dashboard Administrador / Usuario</div>
            </ContainerDashboard>
        </div>
    );
};

export default Dashboard;
