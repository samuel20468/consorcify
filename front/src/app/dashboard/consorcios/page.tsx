"use client";

import { Button, ContainerDashboard } from "@/components/ui";
import Link from "next/link";

const ConsorciosCrud = () => {
    return (
        <div className="h-screen bg-white">
            <ContainerDashboard>
                <div className="">
                    <Link href="/addConsortium">
                        <Button>Crear Consorcio</Button>
                    </Link>
                    <Link href="/dashboard/consorcios/All">
                        <Button>Ver Consorcios</Button>
                    </Link>
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default ConsorciosCrud;
