"use client";
import { useRouter } from "next/navigation";
import { Button, ContainerHeaderDashboard } from "../ui";

const NavbarDashboard = () => {
    const router = useRouter();
    const handleLogout = () => {
        localStorage.removeItem("userData");
        router.push("/");
    };

    return (
        <ContainerHeaderDashboard>
            <div className="flex justify-around w-full">
                <div className="flex items-center justify-center">
                    <h1 className="text-2xl font-bold">Consorcify</h1>
                </div>
                <Button className="border rounded" onClick={handleLogout}>
                    LogOut
                </Button>
            </div>
        </ContainerHeaderDashboard>
    );
};

export default NavbarDashboard;
