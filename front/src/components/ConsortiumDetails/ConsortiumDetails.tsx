// Estilos y omponentes
import "./consortiumStyle.css";
import Map from "@/components/Map/Map";

// Interfaces
import { IConsortium } from "@/Interfaces/consortium.interfaces";

// ----------------

const ConsortiumDetails: React.FC<IConsortium> = ({
    id,
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
    interest_rate,
    active,
    c_admin,
    functional_units,
    expenses,
    suppliers,
    picture,
}: IConsortium) => {
    return (
        <div className="flex flex-col justify-center gap-5 mt-5 border rounded-3xl grad">
            <div className="flex flex-col w-full h-[65%] justify-center">
                <div className="flex flex-col items-center justify-center h-1/6">
                    <h1 className="mb-2 text-5xl">{name}</h1>
                    <h1 className="text-2xl">
                        {street_name} {building_number}
                    </h1>
                    <h1 className="mb-5 font-thin">{`${city}, ${province}, ${country}`}</h1>
                </div>
                <div className="h-5/6">
                    <img
                        src={picture}
                        alt="imagen"
                        className="rounded-[40px] h-[100%]"
                    />
                </div>
            </div>
        </div>
    );
};

export default ConsortiumDetails;
