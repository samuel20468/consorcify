"use client";
import { IUserData } from "@/Interfaces/Interfaces";
import Footer from "@/components/Footer/Footer";
import NavbarDashboard from "@/components/NavbarDashboard/NavbarDashboard";
import SideBarUser from "@/components/SideBarUser/SideBarUser";
import SideBarAdmin from "@/components/SidebarAdmin/SideBarAdmin";
import SidebarSuperAdmin from "@/components/SidebarSuperAdmin/SidebarSuperAdmin";
import SideBarSuperAdmin from "@/components/SidebarSuperAdmin/SidebarSuperAdmin";
import FormRegisterSuperAdmin from "@/components/formRegisterSuperAdmin/FormRegisterSuperAdmin";
import { ContainerDashboard } from "@/components/ui";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AddConsortium = () => {
    const [userData, setUserData] = useState<IUserData>();
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        const { user } = JSON.parse(localStorage.getItem("userData")!);
        if (user?.roles?.[0] == "user") {
            router.push("/dashboard");
        }
        if (user) {
            setUserData(user);
        }
    }, [path]);

    return (
        <div className="flex flex-col h-auto bg-white">
            {(userData?.roles?.[0] == "cadmin" && <SideBarAdmin />) ||
                (userData?.roles?.[0] == "user" && <SideBarUser />) ||
                (userData?.roles?.[0] == "superadmin" && <SidebarSuperAdmin />)}
            <NavbarDashboard />
            <ContainerDashboard>
                <div className="flex items-center justify-center w-1/2 my-10 rounded-lg h-content bg-slate-200">
                    <FormRegisterSuperAdmin />
                </div>
                <div className="bottom-0 w-full bg-black">
                    <Footer />
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default AddConsortium;
