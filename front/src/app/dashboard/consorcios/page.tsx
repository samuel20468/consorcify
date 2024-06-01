"use client";
import { IUserData } from "@/Interfaces/Interfaces";
import NavbarDashboard from "@/components/NavbarDashboard/NavbarDashboard";
import SideBarUser from "@/components/SideBarUser/SideBarUser";
import SideBarAdmin from "@/components/SidebarAdmin/SideBarAdmin";
import SidebarSuperAdmin from "@/components/SidebarSuperAdmin/SidebarSuperAdmin";
import { Button, ContainerDashboard } from "@/components/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ConsorciosCrud = () => {
    const [userData, setUserData] = useState<IUserData>();
    const router = useRouter();

    useEffect(() => {
        const { user } = JSON.parse(localStorage.getItem("userData")!);
        if (user?.roles?.[0] == "user") {
            router.push("/dashboard");
        }
        if (user) {
            setUserData(user);
        }
    }, []);

    return (
        <div className="h-screen bg-white">
            {(userData?.roles?.[0] == "cadmin" && <SideBarAdmin />) ||
                (userData?.roles?.[0] == "user" && <SideBarUser />) ||
                (userData?.roles?.[0] == "superadmin" && <SidebarSuperAdmin />)}

            <NavbarDashboard />
            <ContainerDashboard>
                <div className="">
                    <Link href="/addConsortium">
                        <Button>Crear Consorcio</Button>
                    </Link>
                    <Link href="/dashboard/consorcios/All">
                        <Button>Ver Consorcios</Button>
                    </Link>
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default ConsorciosCrud;
