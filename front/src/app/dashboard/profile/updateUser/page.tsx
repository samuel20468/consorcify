"use client";
import { IUser } from "@/Interfaces/Interfaces";
import { Button, ContainerDashboard, Input, Label } from "@/components/ui";
import { getUserById } from "@/helpers/fetch.helper";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
    const initialData = {
        first_name: "",
        last_name: "",
        email: "",
    };
    useAuth();
    const path = usePathname();
    const router = useRouter();
    const [userData, setUserData] = useState<IUser>(initialData);
    const [errors, setErrors] = useState<IUser>(initialData);
    const { token, data } = useSesion();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserById(data, token);
                if (response?.ok) {
                    const data = await response.json();
                    setUserData(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [token, path]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleBack = () => {
        setUserData(initialData);
        setErrors(initialData);
        router.push("/dashboard/profile");
    };

    return (
        <ContainerDashboard className="w-[90%] h-[90vh]">
            <div className="self-start text-2xl mt-2">Modificar Datos</div>
            <div className="flex flex-col items-center justify-center w-full h-full p-8">
                <form
                    onSubmit={handleSubmit}
                    className=" flex flex-col w-1/2 h-[60%] border justify-between rounded-[40px] p-8 gap-3"
                >
                    <div className="w-full flex justify-end">
                        <Button
                            onClick={handleBack}
                            className="py-2 w-24 rounded-[40px]"
                        >
                            Atras
                        </Button>
                    </div>
                    <div>
                        <Label>Nombre:</Label>
                        <Input
                            type="text"
                            name="first_name"
                            value={userData?.first_name}
                            placeholder="Nombre"
                            onChange={handleChange}
                        />

                        <Label>Apellido:</Label>
                        <Input
                            type="text"
                            name="last_name"
                            value={userData?.last_name}
                            placeholder="Nombre"
                            onChange={handleChange}
                        />

                        <Label>Email:</Label>
                        <Input
                            type="text"
                            name="email"
                            value={userData?.email}
                            placeholder="Nombre"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="w-full">
                        <Button className="w-full py-2 rounded-[40px]">
                            Confirmar Cambios
                        </Button>
                    </div>
                </form>
            </div>
        </ContainerDashboard>
    );
};

export default page;
