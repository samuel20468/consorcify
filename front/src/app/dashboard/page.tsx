import NavbarDashboard from "@/components/NavbarDashboard/NavbarDashboard";
import SideBarUser from "@/components/SideBarUser/SideBarUser";
import SideBarAdmin from "@/components/SidebarAdmin/SideBarAdmin";
import SidebarSuperAdmin from "@/components/SidebarSuperAdmin/SidebarSuperAdmin";
import { Button, ContainerDashboard } from "@/components/ui";
import React from "react";

const Dashboard = () => {
    return (
        <div className="bg-white h-screen">
            {/* <SideBarAdmin /> */}
            {/* <SideBarUser /> */}
            <SidebarSuperAdmin />
            <NavbarDashboard />
            <ContainerDashboard>
                <div className="">
                    <h1>Este es el dashboard del super admin / admin / user</h1>
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default Dashboard;
