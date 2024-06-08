"use client";

// Estilos y componentes
import { Button } from "@/components/ui";
import { BsFillHousesFill } from "react-icons/bs";
import { GrUserWorker } from "react-icons/gr";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { FaRegNewspaper } from "react-icons/fa";
import { GiVote } from "react-icons/gi";

// Hooks
import Link from "next/link";

const SectionPortal = () => {
    return (
        <div className="flex flex-col items-center w-[90%] gap-4">
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
            <Button className="flex justify-center items-center rounded-[40px] w-2/3 py-10 gap-2">
                <FaRegNewspaper size={35} />
                Novedades
            </Button>
            <Button className="flex justify-center items-center rounded-[40px] w-2/3 py-10 gap-2">
                <GiVote size={35} />
                Votaciones
            </Button>
        </div>
    );
};

export default SectionPortal;
