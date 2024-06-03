"use client";

import { IConsortium } from "@/Interfaces/Interfaces";
import ConsortiumCard from "@/components/ConsortiumCard/ConsortiumCard";
import { ContainerDashboard } from "@/components/ui";
import { getConsortiums } from "@/helpers/fetch.helper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
    const [consortiums, setConsortiums] = useState<any>();
    const [token, setToken] = useState<string>("");
    const path = usePathname();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("userData")!);
        if (data) {
            setToken(data.token);
        }
    }, [path]);

    useEffect(() => {
        const fechtData = async (token: string) => {
            const response = await getConsortiums(token);

            if (response) {
                const data = await response.json();
                setConsortiums(data);
            }
        };
        if (token) {
            fechtData(token);
        }
    }, [token]);

    return (
        <ContainerDashboard className="grid items-center justify-center h-[92vh] grid-flow-col gap-3 justify-items-stretch place-content-center bg-[#e5e7eb]">
            {consortiums?.map((consortium: IConsortium) => {
                return (
                    <Link
                        key={consortium.id}
                        href={`/dashboard/consorcios/All/${consortium.id}`}
                        className="flex items-center justify-center w-full my-1"
                    >
                        <ConsortiumCard consortium={consortium} />
                    </Link>
                );
            })}
        </ContainerDashboard>
    );
};

export default page;
