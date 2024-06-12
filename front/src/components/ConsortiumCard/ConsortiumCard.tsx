interface Props {
    children?: React.ReactNode;
    className?: string;
}

import { IConsortium } from "@/Interfaces/consortium.interfaces";

const ConsortiumCard = (props: Props & { consortium: IConsortium }) => {
    const { className, consortium } = props;
    return (
        <div className="p-1 border rounded-[50px] min-w-96 w-3/4 h-1/2 hover:scale-110 hover:shadow-xl hover:shadow-black bg-[#dadada] shadow-2xl">
            <div className="flex">
                <img
                    src="https://i.pinimg.com/564x/47/f2/10/47f2109057d426d054e473fccff5faea.jpg"
                    alt={consortium.name}
                    className="w-40 p-2 border rounded-[50px]"
                />
                <div className="flex flex-col justify-center p-2 ">
                    <h3 className="text-xl font-semibold text-black">
                        {consortium.name}
                    </h3>
                    <p className="text-black">
                        {consortium.street_name}, {consortium.building_number}
                    </p>
                    <p className="text-sm text-black">
                        {consortium.province}, {consortium.city}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ConsortiumCard;
