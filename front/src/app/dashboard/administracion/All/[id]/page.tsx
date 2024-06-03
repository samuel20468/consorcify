"use client";
import { IAdmin } from "@/Interfaces/Interfaces";
import { ContainerDashboard } from "@/components/ui";
import { deleteAdmin, getAdminById } from "@/helpers/fetch.helper";
import useAuth from "@/helpers/useAuth";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const page = () => {
    useAuth();
    const router = useRouter();
    const params: { id: string } = useParams();
    const [token, setToken] = useState<string>("");
    const [admin, setAdmin] = useState<IAdmin>();
    const path = usePathname();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("userData")!);
        if (data) {
            setToken(data.token);
        }
    }, [path, token]);

    useEffect(() => {
        const fecthData = async () => {
            try {
                const response = await getAdminById(params.id, token);
                console.log(response);

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
    }, [path, token]);

    const handleDelete = async () => {
        try {
            const response = await deleteAdmin(params.id, token);
            if (response) {
                Swal.fire({
                    title: "Administrador eliminado correctamente",
                });
                router.back();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ContainerDashboard className="flex justify-center w-[90%] h-[93vh] bg-[#e5e7eb]">
            <div className="flex flex-col items-center justify-around w-3/4 p-10 text-black border rounded-[50px] h-3/4 bg-[#dadada]">
                <h2 className="flex items-center justify-center w-full text-2xl ">
                    {admin?.name}
                </h2>
                <div className="flex flex-col w-3/4 gap-2">
                    <p className="px-5 py-4  rounded-[50px] bg-[#e5e7eb] shadow text-fondo border-fondo">
                        CUIT: {admin?.cuit}
                    </p>
                    <p className="px-5 py-4  rounded-[50px] bg-[#e5e7eb] shadow text-fondo border-fondo">
                        DIRECCIÓN: {admin?.address}
                    </p>
                    <p className="px-5 py-4  rounded-[50px] bg-[#e5e7eb] shadow text-fondo border-fondo">
                        EMAIL: {admin?.email}
                    </p>
                    <p className="px-5 py-4  rounded-[50px] bg-[#e5e7eb] shadow text-fondo border-fondo">
                        TELÉFONO: {admin?.phone_number}
                    </p>
                </div>
                <div className="flex items-center justify-end w-3/4 gap-2">
                    <Link
                        href={`/updateAdministrator/${admin?.id}`}
                        className="border  bg-[#e5e7eb] px-4 py-2 rounded-[50px] hover:bg-black hover:text-white"
                    >
                        <button>Modificar Administrador</button>
                    </Link>

                    <button
                        onClick={handleDelete}
                        className="border  bg-[#e5e7eb] px-4 py-2 rounded-[50px] hover:bg-black hover:text-white"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </ContainerDashboard>
    );
};

export default page;
