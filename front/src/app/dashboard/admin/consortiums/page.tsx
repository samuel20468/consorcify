"use client";

import ConsortiumsAdmin from "@/components/ConsortiumAdmin/ConsortiumAdmin";
import { ContainerDashboard, Title } from "@/components/ui";

const Consortium = () => {
    return (
        <div>
            <ContainerDashboard>
                <Title>Consorcios</Title>
                <ConsortiumsAdmin />
            </ContainerDashboard>
        </div>
    );
};

export default Consortium;
