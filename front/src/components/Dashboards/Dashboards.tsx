"use client";

// Estilos y componentes
import DashboardA from "../DashboardA/DashboardA";
import DashboardU from "../DashboardU/DashboardU";
import DashboardSA from "../DashboardSA/DashboardSA";

// Interfaces
import { useEffect, useState } from "react";

// Hooks
import { IUserData } from "@/Interfaces/user.interfaces";
import { usePathname } from "next/navigation";

// ------------------

const Dashboards = () => {
    const [userData, setUserData] = useState<IUserData>();
    const pathname = usePathname();

    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            const { user } = JSON.parse(storedUserData);
            if (user) {
                setUserData(user);
            }
        }
    }, [pathname]);

    return (
        <div className="text-black">
            {(userData?.roles?.[0] == "cadmin" && <DashboardA />) ||
                (userData?.roles?.[0] == "user" && <DashboardU />) ||
                (userData?.roles?.[0] == "superadmin" && <DashboardSA />)}
        </div>
    );
};

export default Dashboards;
