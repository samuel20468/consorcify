"use client";
import { IMessage } from "@/Interfaces/message.interfaces";
import MessagesUserCards from "@/components/MessagesUserCards/MessagesUserCards";
import { Button, ContainerDashboard, Title } from "@/components/ui";
import { getMessagesForUser } from "@/helpers/fetch.helper.messages";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import { useUfSesion } from "@/helpers/useUfSesion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const News: React.FC = () => {
  useAuth();
  const { token, data } = useSesion();
  const { haveUF, isLoading } = useUfSesion();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !haveUF) {
      router.push("/dashboard/usuario/addfuncionalunit");
    }
  }, [isLoading, haveUF, router]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getMessagesForUser(data.id, token);
        if (response) {
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      fetchMessages();
    }
  }, [token, data.id]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }
  return (
    <div className="h-screen">
      <ContainerDashboard>
        <Title>Mensajes</Title>
        <div className="w-[90%] border-t border-b border-white flex justify-between p-2 mt-5 text-center">
          <h1 className="w-1/5 text-xl">Unidad Funcional</h1>
          <h1 className="w-1/5 text-xl">Destinatario</h1>
          <h1 className="w-1/5 text-xl">Consorcio</h1>
          <h1 className="w-1/5 text-xl">Fecha y hora</h1>
          <h1 className="w-1/5 text-xl">Asunto</h1>
        </div>
        {messages.length > 0 ? (
          <MessagesUserCards messages={messages} />
        ) : (
          <div className="p-8">
            <h1 className="text-2xl">No tienes mensajes enviados.</h1>
          </div>
        )}
        <div className="flex justify-end w-[90%] p-8">
          <div>
            <Link href="/newmessage" className="w-full">
              <Button className="w-32 py-2 rounded-[40px]">
                Nuevo Mensaje
              </Button>
            </Link>
          </div>
        </div>
      </ContainerDashboard>
    </div>
  );
};
export default News;
