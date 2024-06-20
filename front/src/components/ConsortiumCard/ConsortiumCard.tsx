interface Props {
    children?: React.ReactNode;
    className?: string;
}

import { IConsortium } from '@/Interfaces/consortium.interfaces';

const ConsortiumCard = (props: Props & { consortium: IConsortium }) => {
    const { className, consortium } = props;
    return (
        <div className="p-1 border rounded-[50px] min-w-96 w-3/4 hover:scale-110 hover:shadow-xl hover:shadow-black bg-[#dadada] shadow-2xl">
            <div className="flex">
                <img
                    src={consortium.picture}
                    alt={consortium.name}
                    className="w-40 p-1 border rounded-[50px] mr-2"
                />
                <div className="flex flex-col justify-center p-2 ">
                    <h3 className="text-xl font-semibold text-black">
                        {consortium.name}
                    </h3>
                    <p className="text-black">
                        {consortium.street_name} {consortium.building_number}
                    </p>
                    <p className="text-sm text-black">
                        {consortium.province}, {consortium.city} -{' '}
                        {consortium.country}
                    </p>
                    <p className="text-sm text-black">{consortium.zip_code}</p>
                    <p className="text-sm text-black">
                        Categoría: {consortium.category}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ConsortiumCard;
