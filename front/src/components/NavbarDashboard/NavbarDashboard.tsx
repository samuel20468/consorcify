"use client";

// Estilos y componentes
import { Button, ContainerHeaderDashboard } from "../ui";
import { CiUser } from "react-icons/ci";

// Interfaces
import { IAdmin, IUser } from "@/Interfaces/Interfaces";

// Endpoints
import { getAdminById, getUserById } from "@/helpers/fetch.helper";

// Hooks
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import useSesion from "@/helpers/useSesion";

// ----------------------------

const NavbarDashboard = () => {
    const router = useRouter();
    const path = usePathname();
    const { token, data } = useSesion();
    const [user, setUser] = useState<IUser>();
    const [admin, setAdmin] = useState<IAdmin>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserById(data.id, token);
                if (response) {
                    const data = await response.json();
                    setUser(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fetchData();
        }
    }, [token]);

    useEffect(() => {
        const fecthData = async () => {
            try {
                const response = await getAdminById(data.id, token);
                if (response) {
                    const data = await response.json();
                    setAdmin(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fecthData();
        }
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem("userData");
        router.push("/");
    };

    const handleReturn = () => {
        router.push("/dashboard");
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
                        className=" w-48 h-full rounded-[40px]"
                        href="/dashboard/profile"
                    >
                        <Button className="flex items-center justify-evenly p-1 w-full py-2 rounded-[40px]">
                            {data.roles?.[0] === "user" ||
                            data.roles?.[0] === "superadmin" ? (
                                <p>
                                    {user?.first_name} {user?.last_name}
                                </p>
                            ) : (
                                <p>{admin?.name}</p>
                            )}

                            <CiUser size={25} />
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
