"use client";

import { ContainerDashboard } from "@/components/ui";
import { getConsortiums } from "@/helpers/fetch.helper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
    const [consortiums, setConsortiums] = useState<any>();
    const path = usePathname();

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
