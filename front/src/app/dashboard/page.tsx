import SideBarUser from "@/components/SideBarUser/SideBarUser";
import SideBarAdmin from "@/components/SidebarAdmin/SideBarAdmin";
import React from "react";

const Dashboard = () => {
    return (
        <div>
            {/* <SideBarAdmin /> */}
            <SideBarUser />
        </div>
    );
};

export default Dashboard;
