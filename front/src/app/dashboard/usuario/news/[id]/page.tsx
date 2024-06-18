"use client";
import { Button, ContainerDashboard, Title } from "@/components/ui";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const NewsId: React.FC = () => {
    useAuth();
    const path = usePathname();
    const { token, data } = useSesion();

    useEffect(() => {
        if (token) {
        }
    }, [path]);

    return (
        <div>
            <ContainerDashboard className="w-[90%] gap-3">
                <Title></Title>
                <div className="flex w-[90%] p-10  min-h-96">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Et natus sapiente totam minus eaque nobis illo
                        tempore harum praesentium laboriosam repudiandae,
                        voluptate doloremque, suscipit repellat ipsum inventore
                        cum vero sit dolorem veritatis! Quam, magnam suscipit
                        animi alias numquam unde dicta reiciendis, omnis
                        incidunt exercitationem magni. Amet ipsum accusamus
                        voluptates deserunt.
                    </p>
                </div>
                <div className="flex w-[90%]">
                    <Link
                        href="/dashboard/usuario/news"
                        className="flex justify-end w-full"
                    >
                        <Button className="w-32 py-2 rounded-[40px]">
                            Volver
                        </Button>
                    </Link>
                </div>
            </ContainerDashboard>
        </div>
    );
};
export default NewsId;
