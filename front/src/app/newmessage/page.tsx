"use client";
import { Button, ContainerDashboard, Input, Label } from "@/components/ui";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";

const News = () => {
    const [message, setMessage] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            Swal.fire({
                title: "mensaje enviado",
                customClass: {
                    container: "sweetalert-container",
                    popup: "sweetalert-popup",
                    confirmButton: "sweetalert-button",
                },
                background: "#f3f4f6",
                backdrop: `
                    rgba(0,0,0,0.4)
                    url('https://sweetalert2.github.io/images/nyan-cat.gif')
                    center top
                    no-repeat
                `,
            });
            setMessage("");
            return;
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setMessage(value);
    };

    return (
        <ContainerDashboard className="w-[90%] flex gap-2">
            <div className="w-[90%] border-b pt-8">
                <h2 className="text-2xl">Nuevo Mensaje</h2>
            </div>
            <form
                className=" flex flex-col gap-2 w-[90%] p-8 border"
                onSubmit={handleSubmit}
            >
                <Label>Mensaje</Label>
                <textarea
                    className="flex w-full p-2 my-1 text-gray-200 rounded-md shadow-xl bg-input placeholder:font-extralight placeholder:text-gray-500 focus:outline-none h-[200px]"
                    value={message}
                    name="mesagge"
                    onChange={handleChange}
                />
                <div className="flex items-center justify-end w-full">
                    <Button className="w-32 py-2 rounded-[40px]">
                        Enviar Mensaje
                    </Button>
                </div>
            </form>
        </ContainerDashboard>
    );
};
export default News;
