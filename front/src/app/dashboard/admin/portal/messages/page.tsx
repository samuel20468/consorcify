'use client';

// Estilos y componentes
import { ContainerDashboard, Select, Title } from '@/components/ui';

// Endpoints
import { getConsortiumsByAdminId } from '@/helpers/fetch.helper.consortium';

// Interfaces
import { IConsortium } from '@/Interfaces/consortium.interfaces';

// Hooks
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import useAuth from '@/helpers/useAuth';
import useSesion from '@/helpers/useSesion';
import { IMessage } from '@/Interfaces/message.interfaces';
import { getMessagesForCAdminInConsortium } from '@/helpers/fetch.helper.messages';
import MessagesCards from '@/components/MessagesCards/MessagesCards';

// ------------------

const Messages = () => {
    useAuth();
    const { token, data } = useSesion();
    const pathname = usePathname();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [consortiums, setConsortiums] = useState<IConsortium[]>([]);
    const [selectedConsortiumId, setSelectedConsortiumId] = useState<
        string | null
    >(null);
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        const fetchConsortiums = async () => {
            try {
                const response = await getConsortiumsByAdminId(data.id, token);
                if (response) {
                    const data = await response.json();
                    setConsortiums(data);
                    if (data.length > 0) {
                        setSelectedConsortiumId(data[0].id);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (token) {
            fetchConsortiums();
        }
    }, [token, data.id]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedConsortiumId) return;
            try {
                const response = await getMessagesForCAdminInConsortium(
                    data.id,
                    selectedConsortiumId,
                    token
                );
                if (response) {
                    const data = await response.json();
                    setMessages(data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (token && selectedConsortiumId) {
            fetchMessages();
        }
        if (deleted) {
            fetchMessages(); // Refrescar la lista de mensajes
            setDeleted(false); // Resetear el estado deleted
        }
    }, [token, selectedConsortiumId, data.id, deleted]);

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedConsortiumId(event.target.value);
    };

    return (
        <div className="h-screen">
            <ContainerDashboard>
                <Title>
                    Portal{' '}
                    <span className="text-2xl font-thin">| Mensajería</span>
                </Title>

                <div className="flex items-center justify-between w-[98%]">
                    <div className="w-2/3">
                        <Select
                            id="consortium_id"
                            name="consortium_id"
                            className="w-1/3 h-10 px-2 my-1 text-gray-200 rounded-md shadow-xl cursor-pointer bg-input focus:outline-none no-spinners"
                            value={selectedConsortiumId || ''}
                            onChange={handleSelectChange}
                        >
                            {consortiums.length > 0 &&
                                consortiums.map((consortium) => (
                                    <option
                                        value={consortium.id}
                                        key={consortium.id}
                                    >
                                        {consortium.name}
                                    </option>
                                ))}
                        </Select>
                    </div>
                </div>
                <div className="w-[90%] border-t border-b border-white flex justify-between p-2 mt-5 text-center">
                    <h1 className="w-1/6 text-xl">Unidad Funcional</h1>
                    <h1 className="w-1/6 text-xl">Remitente</h1>
                    <h1 className="w-1/6 text-xl">Consorcio</h1>
                    <h1 className="w-1/6 text-xl">Fecha y hora</h1>
                    <h1 className="w-1/6 text-xl">Asunto</h1>
                    <div className="w-1/6"></div>
                </div>
                {messages.length > 0 ? (
                    <MessagesCards messages={messages} token={token} />
                ) : (
                    <div className="p-8">
                        <h1 className="text-2xl">
                            No tienes mensajes en este consorcio.
                        </h1>
                    </div>
                )}
            </ContainerDashboard>
        </div>
    );
};

export default Messages;
