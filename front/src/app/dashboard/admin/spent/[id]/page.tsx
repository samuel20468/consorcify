"use client";

// Estilos y componentes
import { ContainerDashboard, Title } from "@/components/ui";

// Endpoints
import { getExpeditureById } from "@/helpers/fetch.helper.expenditure";

// Interfaces
import { IExpenditure } from "@/Interfaces/expenditures.interfaces";

// Hooks
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";

// --------------------

const ExpenditureId = () => {
    useAuth();
    const { token } = useSesion();
    const pathname = usePathname();
    const params: { id: string } = useParams();
    const [expenditure, setExpenditure] = useState<IExpenditure>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getExpeditureById(token, params.id);
                if (response) {
                    const data = response.json();
                    setExpenditure(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fetchData();
        }
    }, [token, params.id, pathname]);

    return (
        <div className="h-screen text-white">
            <ContainerDashboard>
                <Title>
                    Gastos{" "}
                    <span className="text-xl font-thin">
                        | {expenditure?.description}
                    </span>
                </Title>
                <div>
                    <h1>{expenditure?.description}</h1>
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default ExpenditureId;
