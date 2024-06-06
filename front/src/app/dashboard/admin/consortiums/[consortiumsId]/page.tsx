"use client";

import { useParams } from "next/navigation";

const ConsortiumId = () => {
    const { consortiumsId } = useParams();

    return (
        <div>
            <h1>aca van los detalles del consorcio: {consortiumsId}</h1>
        </div>
    );
};

export default ConsortiumId;
