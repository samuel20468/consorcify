"use client";

import { ContainerDashboard } from "@/components/ui";
import useAuth from "@/helpers/useAuth";

const Claim = () => {
    useAuth();

    return (
        <div>
            <ContainerDashboard>
                <h1 className="flex items-center justify-center m-auto">
                    Acá van a ir todos los reclamos que tiene esta
                    administración
                </h1>
            </ContainerDashboard>
        </div>
    );
};

export default Claim;
