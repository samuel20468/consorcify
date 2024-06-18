// Interfaces
import { IMessage } from '@/Interfaces/message.interfaces';

// Hooks
import Link from 'next/link';
import MessageUserCard from '../MessagesUserCard/MessageUserCard';

// --------------------

const MessagesUserCards = ({ messages }: { messages: IMessage[] }) => {
    return (
        <div className="flex flex-col justify-center gap-5 py-5 w-[90%]">
            {messages?.map((message) => (
                <Link
                    href={`/dashboard/usuario/news/${message.id}`}
                    key={message.id}
                >
                    <MessageUserCard
                        key={message.timestamp}
                        message={message}
                    />
                </Link>
            ))}
        </div>
    );
};

export default MessagesUserCards;
