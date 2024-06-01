"use client";
import { IUserData } from "@/Interfaces/Interfaces";
import NavbarDashboard from "@/components/NavbarDashboard/NavbarDashboard";
import SideBarUser from "@/components/SideBarUser/SideBarUser";
import SideBarAdmin from "@/components/SidebarAdmin/SideBarAdmin";
import SidebarSuperAdmin from "@/components/SidebarSuperAdmin/SidebarSuperAdmin";
import { ContainerDashboard, Button } from "@/components/ui";
import { getConsortiums } from "@/helpers/fetch.helper";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
    const [userData, setUserData] = useState<IUserData>();
    const [consortiums, setConsortiums] = useState<any>();
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
    }, []);

    useEffect(() => {
        const fechtData = async () => {
            const response = await getConsortiums();

            if (response) {
                const data = await response.json();
                setConsortiums(data);
            }
        };
        fechtData();
    }, [path]);

    return (
        <div className="h-screen bg-white">
            {(userData?.roles?.[0] == "cadmin" && <SideBarAdmin />) ||
                (userData?.roles?.[0] == "user" && <SideBarUser />) ||
                (userData?.roles?.[0] == "superadmin" && <SidebarSuperAdmin />)}

            <NavbarDashboard />
            <ContainerDashboard>
                {consortiums?.map((consortium: any) => {
                    return (
                        <Link
                            href={`/dashboard/consorcios/All/${consortium.id}`}
                            className="border rounded w-[50%] flex flex-col items-center justify-center my-3 p-5 bg-slate-200"
                        >
                            <div key={consortium.id}>
                                <p className="flex items-center justify-center font-bold">
                                    {consortium.name}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </ContainerDashboard>
        </div>
    );
};

export default page;
