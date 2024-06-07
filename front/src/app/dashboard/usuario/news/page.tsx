import { Button, ContainerDashboard } from "@/components/ui";
import Link from "next/link";

const News = () => {
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
