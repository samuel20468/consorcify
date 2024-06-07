"use client";

// Estilos y componentes
import Dashboards from "@/components/Dashboards/Dashboards";

// Hooks
import useAuth from "@/helpers/useAuth";

// ------------

const Dashboard = () => {
    useAuth();

    return (
        <div className="h-full">
            <Dashboards />
        </div>
    );
};

export default Dashboard;
