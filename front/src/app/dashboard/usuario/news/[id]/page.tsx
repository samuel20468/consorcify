import { Button, ContainerDashboard } from "@/components/ui";
import Link from "next/link";

const NewsId: React.FC = () => {
    return (
        <div>
            <ContainerDashboard className="w-[90%] gap-3">
                <div className=" flex w-[90%] border-b pt-8">
                    <h2 className="text-2xl">Nombre de la noticia</h2>
                </div>
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
