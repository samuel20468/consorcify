"use client";

import { ContainerDashboard, Title } from "@/components/ui";
import useAuth from "@/helpers/useAuth";

const Claim = () => {
    useAuth();

    return (
        <div>
            <ContainerDashboard>
                <Title>Raclamos </Title>
            </ContainerDashboard>
        </div>
    );
};

export default Claim;
