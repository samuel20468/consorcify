"use client";

import { IAdmin } from "@/Interfaces/Interfaces";
import { ContainerDashboard } from "@/components/ui";
import { getAdmins } from "@/helpers/fetch.helper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
    const [admins, setAdmins] = useState<IAdmin[]>([]);
    const [token, setToken] = useState<string>("");
    const path = usePathname();

    console.log(admins);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("userData")!);
        if (data) {
            setToken(data.token);
        }
    }, [path, token]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAdmins(token);
                if (response) {
                    setAdmins(response);
                }
            } catch (error) {}
        };
        if (token) {
            fetchData();
        }
    }, [token]);

    console.log(admins);

    return (
        <ContainerDashboard className=" xl:w-[90%] w-[80%] flex items-center justify-center h-[92vh] grid-flow-col gap-3 justify-items-stretch place-content-center bg-[#e5e7eb] p-5">
            {admins?.length != 0 ? (
                admins?.map((elemento) => {
                    return (
                        <Link
                            href={`/dashboard/administracion/All/${elemento.id}`}
                            className="text-black flex w-3/4 rounded border border-black mx-2 p-3 bg-[#dadada] hover:scale-110 hover:transition hover:duration-700"
                        >
                            <div className="flex justify-between w-full text-center">
                                <p className="w-[33.33%]">{elemento.name}</p>
                                <p className="w-[33.33%]">{elemento.cuit}</p>
                                <p className="w-[33.33%]">{elemento.email}</p>
                            </div>
                        </Link>
                    );
                })
            ) : (
                <div>Todavia no hay administradores</div>
            )}
        </ContainerDashboard>
    );
};

export default page;
