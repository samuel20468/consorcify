"use client";
import { IUser } from "@/Interfaces/Interfaces";
import { Button, ContainerDashboard } from "@/components/ui";
import { getUserById } from "@/helpers/fetch.helper";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import { log } from "console";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Profile = () => {
    const path = usePathname();
    useAuth();
    const [userData, setUserData] = useState<IUser>();
    const { token, data } = useSesion();
    console.log(data);
    console.log(userData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserById(data, token);
                console.log(response);

                if (response?.ok) {
                    const data = await response.json();

                    setUserData(data);
                }
            } catch (error) {}
        };
        fetchData();
    }, [path, token]);

    return (
        <ContainerDashboard className="w-[90%] h-[90vh]">
            <div className="flex  w-[90%] h-full m-3 bg-slate-50 p-10 gap-10 rounded-[40px]">
                <div className="flex flex-col rounded-[40px] w-1/2 p-2  h-full bg-gray-400">
                    <div className="w-full h-1/2 bg-white rounded-t-[40px] px-10 pt-10"></div>
                    <div className="flex flex-col text-black w-full justify-between h-1/2 bg-white rounded-b-[40px] p-10 gap-3">
                        <div>
                            <h3>NOMBRE: {userData?.first_name}</h3>
                            <h3>APELLIDO: {userData?.last_name}</h3>
                            <h3>EMAIL: {userData?.email}</h3>
                        </div>
                        <div className="w-full">
                            <Link
                                className="w-full h-full"
                                href="/dashboard/profile/updateUser"
                            >
                                <Button className="w-full rounded-[40px] py-2">
                                    Editar Informacion
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 rounded-[40px] w-1/2 h-full bg-gray-400 p-2">
                    <div className="w-full h-1/3 border rounded-[40px]"></div>
                    <div className="w-full h-2/3 border rounded-[40px]"></div>
                </div>
            </div>
        </ContainerDashboard>
    );
};

export default Profile;
