// Interfaces
import { IConsortium } from "@/Interfaces/consortium.interfaces";

// ----------------

const ConsorCard: React.FC<IConsortium> = ({
    suterh_key,
    name,
    cuit,
    street_name,
    building_number,
    zip_code,
    country,
    province,
    city,
    floors,
    ufs,
    category,
    first_due_day,
    c_admin,
}: IConsortium) => {
    return (
        <div className="flex justify-between py-2 text-center text-black bg-gray-200 rounded-lg hover:bg-slate-400 hover:text-white">
            <div className="w-1/5">
                <h1>{name}</h1>
            </div>
            <div className="w-1/5">
                <h1>{cuit}</h1>
            </div>
            <div className="w-1/5">
                <h1>
                    {street_name} {building_number}
                </h1>
            </div>
            <div className="w-1/5">
                <h1>{ufs}</h1>
            </div>
            <div className="w-1/5">
                <h1>$200.000</h1>
            </div>
        </div>
    );
};

export default ConsorCard;
