"use client";

import { IConsortium } from "@/Interfaces/Interfaces";
import ConsortiumCard from "@/components/ConsortiumCard/ConsortiumCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import { ContainerDashboard } from "@/components/ui";
import { getConsortiums } from "@/helpers/fetch.helper";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
    useAuth();
    const { token } = useSesion();
    const [consortiums, setConsortiums] = useState<IConsortium[]>([]);
    const [result, setResult] = useState<IConsortium[]>([]);

    const path = usePathname();

    useEffect(() => {
        const fechtData = async (token: string) => {
            const response = await getConsortiums(token);

            if (response) {
                const data = await response.json();
                setConsortiums(data);
                setResult(data);
            }
        };
        if (token) {
            fechtData(token);
        }
    }, [token, path]);

    const handleSearch = (query: string) => {
        if (!query.trim()) {
            setResult(consortiums || []);
            return;
        }

        const filteredData = (consortiums || []).filter(
            (consortium: IConsortium) => {
                return Object.values(consortium).some(
                    (value) =>
                        typeof value === "string" &&
                        value
                            .toLocaleLowerCase()
                            .includes(query.toLocaleLowerCase())
                );
            }
        );

        setResult(filteredData);
    };

    return (
        <ContainerDashboard className="flex flex-col items-center py-5 justify-center  grid-flow-col gap-3 justify-items-stretch place-content-center bg-[#e5e7eb]">
            <div className="w-full">
                <SearchBar onSearch={handleSearch} />
            </div>
            {result?.map((consortium: IConsortium) => {
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
