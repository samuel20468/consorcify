import React, { useEffect, useState } from "react";
import { ContainerDashboard } from "../ui";
import MessagesCards from "../MessagesCards/MessagesCards";
import { IMessage } from "@/Interfaces/message.interfaces";
import useSesion from "@/helpers/useSesion";
import useAuth from "@/helpers/useAuth";
import { getMessagesForUser } from "@/helpers/fetch.helper.messages";
import Swal from "sweetalert2";
import { usePathname } from "next/navigation";

const BandejaMensajes = () => {
    useAuth();
    const path = usePathname();
    const { token, data } = useSesion();
    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await getMessagesForUser(data.id, token);
                if (response.ok) {
                    const messages = await response.json();
                    setMessages(messages);
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "No se pudo obtener los mensajes",
                        icon: "error",
                        confirmButtonText: "Aceptar",
                    });
                }
            } catch (error) {
                console.error(error);
                Swal.fire({
                    title: "Error",
                    text: (error as Error).message,
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            }
        };
        if (token) {
            fetchMessages();
        }
    }, [token]);

    return (
        <ContainerDashboard className="w-[90%] h-[90vh] items-center">
            {messages.length > 0 ? (
                <MessagesCards messages={messages} token={token} />
            ) : (
                <div className="p-8 flex items-center justify-center">
                    <h1 className="text-2xl flex items-center justify-center">
                        Todavia no enviaste ningun mensaje
                    </h1>
                </div>
            )}
        </ContainerDashboard>
    );
};

export default BandejaMensajes;
