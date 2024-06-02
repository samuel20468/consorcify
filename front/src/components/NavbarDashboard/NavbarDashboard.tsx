"use client";

import { useRouter } from "next/navigation";
import { Button, ContainerHeaderDashboard } from "../ui";

const NavbarDashboard = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("userData");
        router.push("/login");
    };

    return (
        <ContainerHeaderDashboard>
            <div className="flex items-center w-full justify-end mr-4">
                <div className="w-1/12">
                    <Button onClick={handleLogout}>Cerrar sesión</Button>
                </div>
            </div>
        </ContainerHeaderDashboard>
    );
};

export default NavbarDashboard;
