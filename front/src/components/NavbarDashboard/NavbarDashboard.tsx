"use client";

import { useRouter } from "next/navigation";
import { Button, ContainerHeaderDashboard } from "../ui";

const NavbarDashboard = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("userData");
        router.push("/");
    };

    const handleReturn = () => {
        router.back();
    };

    return (
        <ContainerHeaderDashboard>
            <div className="flex items-center justify-end w-full gap-1 mr-4">
                <div className="w-1/12">
                    <Button onClick={handleReturn}>Volver Atrás</Button>
                </div>
                <div className="w-1/12">
                    <Button onClick={handleLogout}>Cerrar sesión</Button>
                </div>
            </div>
        </ContainerHeaderDashboard>
    );
};

export default NavbarDashboard;
