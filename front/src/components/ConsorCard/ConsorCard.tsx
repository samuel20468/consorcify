// Interfaces
import { IConsortium } from "@/Interfaces/Interfaces";

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
        <div className="flex justify-between py-2 text-center bg-gray-300 rounded-lg hover:bg-slate-300">
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
