"use client";

// Estilos y contenedores
import { ContainerDashboard, Title } from "@/components/ui";
import FormAddFuncionalUnit from "@/components/FormAddFuncionalUnit/page";

// Interfaces
import { IConsortium } from "@/Interfaces/consortium.interfaces";

// Endpoints
import { getConsortiumById } from "@/helpers/fetch.helper.consortium";

// Hooks
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";

// --------------------

const AddFuncionalUnits = () => {
    useAuth();
    const [consortium, setConsortium] = useState<IConsortium>();
    const { id }: { id: string } = useParams();
    const params: { id: string } = useParams();
    const { token } = useSesion();
    const pathname = usePathname();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getConsortiumById(params.id, token);
                if (response) {
                    const data = await response.json();
                    setConsortium(data);
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
        <div className="h-screen">
            <ContainerDashboard>
                <Title>
                    Consorcios{" "}
                    <span className="text-2xl font-thin">
                        | {consortium?.name}
                    </span>{" "}
                    <span className="text-xl font-thin">
                        | Agregar Unidad Funcional
                    </span>
                </Title>
                <div className="w-[80%]">
                    <FormAddFuncionalUnit consortium_id={id} />
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default AddFuncionalUnits;
