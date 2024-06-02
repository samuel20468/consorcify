"use client";

import { Button, ContainerDashboard } from "@/components/ui";
import Link from "next/link";

const ConsorciosCrud = () => {
    return (
        <div className="h-screen bg-white">
            <ContainerDashboard>
                <div className="">
                    <Link href="/addAdministrator">
                        <Button>Crear Administrador</Button>
                    </Link>
                    <Button>Ver Administradores</Button>
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default ConsorciosCrud;
