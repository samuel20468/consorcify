"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button, ContainerHeaderDashboard } from "../ui";
import { Avatar } from "@/helpers/icons.helper";
import Link from "next/link";

const NavbarDashboard = () => {
    const router = useRouter();
    const path = usePathname();

    const handleLogout = () => {
        localStorage.removeItem("userData");
        router.push("/");
    };

    const handleReturn = () => {
        router.push("/dashboard");
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <ContainerHeaderDashboard className="w-[90%] p-8">
            <div className="flex items-center justify-start w-1/3">
                <div className="">
                    {path !== "/dashboard" && (
                        <Button
                            onClick={handleReturn}
                            className="w-32 py-2 rounded-[40px]"
                        >
                            Inicio
                        </Button>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-center w-1/3">
                <h2 className="text-3xl">CONSORCIFY</h2>
            </div>
            <div className="flex items-center justify-end w-1/3">
                <div className="flex gap-2">
                    <Link
                        className="w-40 h-full rounded-[40px]"
                        href="/dashboard/profile"
                    >
                        <Button className="flex items-center justify-evenly p-1 w-full py-2 rounded-[40px]">
                            <p>Nombre Usuario</p>
                            <Avatar />
                        </Button>
                    </Link>
                    <Button
                        onClick={handleLogout}
                        className="w-32 py-2 rounded-[40px]"
                    >
                        Cerrar sesión
                    </Button>
                </div>
            </div>
        </ContainerHeaderDashboard>
    );
};

export default NavbarDashboard;
