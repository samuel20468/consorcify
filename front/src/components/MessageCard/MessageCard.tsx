// Interfaces
import { IMessage } from '@/Interfaces/message.interfaces';
import { Button } from '../ui';
import { useRouter } from 'next/navigation';
import { markAsRead } from '@/helpers/fetch.helper.messages';
import Link from 'next/link';

// ----------------

const MessageCard: React.FC<{
    message: IMessage;
    token: string;
}> = ({ message, token }) => {
    const {
        id,
        sender,
        functional_unit,
        consortium,
        subject,
        timestamp,
        is_read,
    } = message;
    const router = useRouter();

    const handleOnClick = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        try {
            const result = await markAsRead(id, token);
            if (result) {
                router.push(`/dashboard/admin/portal/messages/${id}`);
            }
        } catch (error) {
            console.error('Error al marcar el mensaje como leído', error);
        }
    };

    return (
        <div className="flex justify-between py-2 text-center text-black bg-gray-200 rounded-lg hover:bg-slate-400 hover:text-white">
            <div className="w-1/6">
                <h3>{functional_unit}</h3>
            </div>
            <div className="w-1/6">
                <h3>{sender}</h3>
            </div>
            <div className="w-1/6">
                <h3>{consortium}</h3>
            </div>
            <div className="w-1/6">
                <h3>{timestamp}</h3>
            </div>
            <div className="w-1/6">
                <h3>{subject}</h3>
            </div>
            <div className="w-1/6">
                {is_read === false ? (
                    <Button
                        onClick={handleOnClick}
                        className="w-1/2 my-0 mx-auto rounded-lg bg-inherit border border-black"
                    >
                        Abrir
                    </Button>
                ) : (
                    <Link href={`/dashboard/admin/portal/messages/${id}`}>
                        <Button className="w-1/2 my-0 mx-auto rounded-lg bg-inherit border border-black">
                            Ver mensaje
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default MessageCard;
