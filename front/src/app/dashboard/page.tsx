"use client";

import { ContainerDashboard } from "@/components/ui";
import useAuth from "@/helpers/useAuth";

const Dashboard = () => {
    useAuth();

    return (
        <div className="h-screen">
            <ContainerDashboard>
                <div>
                    <h1>Este es el dashboard del super admin / admin / user</h1>
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default Dashboard;
