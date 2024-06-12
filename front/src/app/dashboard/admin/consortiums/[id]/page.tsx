"use client";

// Estilos y contenedores
import { ContainerDashboard, Title } from "@/components/ui";

// Endpoints
import { getConsortiumById } from "@/helpers/fetch.helper";

// Interfaces
import { IConsortium } from "@/Interfaces/Interfaces";

// Hooks
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import FormAddFuncionalUnit from "@/components/FormAddFuncionalUnit/page";

// --------------------

const ConsortiumId = () => {
    useAuth();
    const { token } = useSesion();
    const pathname = usePathname();
    const params: { id: string } = useParams();
    const [consortium, setConsortium] = useState<IConsortium>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getConsortiumById(params.id, token);
                if (response) {
                    setConsortium(response);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fetchData();
        }
    }, [token, pathname, params.id]);

    return (
        <ContainerDashboard className="w-[90%] h-[90vh]">
            <Title>
                Consorcios{" "}
                <span className="text-xl font-thin">| {consortium?.name}</span>
            </Title>
            <div className="w-[90%] h-full border rounded-[40px] flex justify-center items-center">
                <FormAddFuncionalUnit consortium_id={consortium?.id!} />
            </div>
        </ContainerDashboard>
    );
};

export default ConsortiumId;
