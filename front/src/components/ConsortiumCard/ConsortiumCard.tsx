import { IConsortium, Props } from "@/Interfaces/Interfaces";
import React from "react";

const ConsortiumCard = (props: Props & { consortium: IConsortium }) => {
    const { className, consortium } = props;
    return (
        <div className="p-1 border rounded min-w-96 h-1/2 hover:scale-110 hover:shadow-md hover:shadow-white bg-fondo">
            <div className="flex">
                <img
                    src="https://i.pinimg.com/564x/47/f2/10/47f2109057d426d054e473fccff5faea.jpg"
                    alt={consortium.name}
                    className="w-40 p-2 border"
                />
                <div className="flex flex-col justify-center p-2 ">
                    <h3 className="text-xl font-semibold ">
                        {consortium.name}
                    </h3>
                    <p>
                        {consortium.street_name}, {consortium.building_number}
                    </p>
                    <p className="text-sm">
                        {consortium.province}, {consortium.city}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ConsortiumCard;
