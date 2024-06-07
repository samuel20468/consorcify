"use client";

// Estilos y componentes
import { Button, ContainerDashboard, Title } from "@/components/ui";
import { BsFillHousesFill } from "react-icons/bs";
import { GrUserWorker } from "react-icons/gr";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { FaRegNewspaper } from "react-icons/fa";
import { GiVote } from "react-icons/gi";

// Hooks
import useAuth from "@/helpers/useAuth";
import Link from "next/link";

// -----------------

const Portal = () => {
    useAuth();

    return (
        <div className="h-screen text-black bg-gray-100">
            <ContainerDashboard>
                <Title>Portal</Title>
                <div className="flex flex-col w-[90%]">
                    <div className="flex justify-center w-full gap-2 pb-2">
                        <Button className="flex justify-center items-center rounded-[40px] w-2/3 py-10 gap-2">
                            <BsFillHousesFill size={35} />
                            Amenities
                        </Button>
                        <Link href="portal/suppliers" className="w-2/3">
                            <Button className="flex justify-center items-center rounded-[40px] w-full py-10 gap-2">
                                <GrUserWorker size={35} />
                                <span>Proveedores</span>
                            </Button>
                        </Link>
                        <Button className="flex justify-center items-center rounded-[40px] w-2/3 py-10 gap-2">
                            <IoDocumentAttachOutline size={35} />
                            Documentos
                        </Button>
                    </div>
                    <div className="flex justify-center gap-2">
                        <Button className="flex justify-center items-center rounded-[40px] w-full py-10 gap-2">
                            <FaRegNewspaper size={35} />
                            Novedades
                        </Button>
                        <Button className="flex justify-center items-center rounded-[40px] w-full py-10 gap-2">
                            <GiVote size={35} />
                            Votaciones
                        </Button>
                    </div>
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default Portal;
