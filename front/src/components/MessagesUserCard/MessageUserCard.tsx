// Interfaces
import { IMessage } from '@/Interfaces/message.interfaces';

// ----------------

const MessageUserCard: React.FC<{
    message: IMessage;
}> = ({ message }) => {
    const { receiver, functional_unit, consortium, subject, timestamp } =
        message;

    return (
        <div className="flex justify-between py-2 text-center text-black bg-gray-200 rounded-lg hover:bg-slate-400 hover:text-white">
            <div className="w-1/6">
                <h3>{functional_unit}</h3>
            </div>
            <div className="w-1/6">
                <h3>{receiver}</h3>
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
        </div>
    );
};

export default MessageUserCard;
