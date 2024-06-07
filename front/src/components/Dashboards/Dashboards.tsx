"use client";

import { IUserData } from "@/Interfaces/Interfaces";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardA from "../DashboardA/DashboardA";
import DashboardU from "../DashboardU/DashboardU";
import DashboardSA from "../DashboardSA/DashboardSA";

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
