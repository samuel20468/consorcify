"use client";

import Link from "next/link";
import { itemsNavbarSuperAdmin } from "@/utils/data";
import { ContainerSideBar } from "../ui";

const SideBarSuperAdmin = () => {
    return (
        <ContainerSideBar>
            <nav className="flex flex-col h-full justify-evenly">
                {itemsNavbarSuperAdmin.map((item) => (
                    <Link
                        href={item.link}
                        key={item.id}
                        className="flex flex-col items-center text-xs lg:text-base"
                    >
                        <div>{item.icon}</div>
                        <h1>{item.title}</h1>
                    </Link>
                ))}
            </nav>
        </ContainerSideBar>
    );
};

export default SideBarSuperAdmin;
