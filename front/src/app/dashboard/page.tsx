"use client";

import Dashboards from "@/components/Dashboards/Dashboards";
import useAuth from "@/helpers/useAuth";

const Dashboard = () => {
    useAuth();

    return (
        <div className="h-screen">
            <Dashboards />
        </div>
    );
};

export default Dashboard;
