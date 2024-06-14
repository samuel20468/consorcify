// Estilos y omponentes
import "./consortiumStyle.css";

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
        <div className="flex flex-col justify-center w-2/4 gap-5 p-5 mt-5 border rounded-3xl grad">
            <div className="flex w-full h-[55vh] gap-5">
                <div className="flex items-center justify-center w-2/3 bg-blue-300 rounded-2xl">
                    <img
                        src={picture}
                        alt="imagen"
                        className="rounded-[40px]"
                    />
                </div>
                <div className="flex flex-col justify-center w-1/3">
                    <h1 className="mb-2 text-2xl ">{name}</h1>
                    <h1>
                        {street_name} {building_number}
                    </h1>
                    <h1 className="mb-5">{`${city}, ${province}, ${country}`}</h1>
                    <h1>Categoría del edificio: {category}</h1>
                    <h1>Cantidad de pisos: {floors}</h1>
                    <h1 className="mb-6">Unidades Funcionales: {ufs}</h1>
                    <h1>Administrador: {c_admin.name}</h1>
                </div>
            </div>
            <div className="flex items-center justify-center w-full h-[25vh] bg-yellow-200 rounded-2xl">
                Acá v a ir Google Maps
            </div>
        </div>
    );
};

export default ConsortiumDetails;
