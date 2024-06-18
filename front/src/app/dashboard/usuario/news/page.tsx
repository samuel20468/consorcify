"use client";
import { Button, ContainerDashboard } from "@/components/ui";
import { useUfSesion } from "@/helpers/useUfSesion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const News: React.FC = () => {
    const { haveUF, isLoading, functional_unit } = useUfSesion();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !haveUF) {
            router.push("/dashboard/usuario/addfuncionalunit");
        }
    }, [isLoading, haveUF, router]);

    if (isLoading) {
        return <div>Cargando...</div>;
    }
    return (
        <div>
            <ContainerDashboard className="w-[90%]">
                <div className="flex justify-between w-[90%] border-b p-8">
                    <div className="flex gap-2">
                        <Button className="w-32 py-2 rounded-[40px]">
                            Novedades
                        </Button>
                        <Button className="w-32 py-2 rounded-[40px]">
                            Votaciones
                        </Button>
                    </div>
                    <div>
                        <Link href="/newmessage" className="w-full">
                            <Button className="w-32 py-2 rounded-[40px]">
                                Mensajes
                            </Button>
                        </Link>
                    </div>
                </div>
                <div></div>
            </ContainerDashboard>
        </div>
    );
};
export default News;
