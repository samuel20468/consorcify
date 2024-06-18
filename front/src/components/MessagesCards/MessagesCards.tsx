// Estilos y componentes
import MessageCard from '../MessageCard/MessageCard';

// Interfaces
import { IMessage } from '@/Interfaces/message.interfaces';

// Hooks
import Link from 'next/link';

// --------------------

const MessagesCards = ({
    messages,
    token,
}: {
    messages: IMessage[];
    token: string;
}) => {
    return (
        <div className="flex flex-col justify-center gap-5 py-5 w-[90%]">
            {messages?.map((message) => (
                <Link
                    href={`/dashboard/admin/portal/messages/${message.id}`}
                    key={message.id}
                >
                    <MessageCard
                        key={message.timestamp}
                        message={message}
                        token={token}
                    />
                </Link>
            ))}
        </div>
    );
};

export default MessagesCards;
