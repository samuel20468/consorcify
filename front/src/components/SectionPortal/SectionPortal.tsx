'use client';

// Estilos y componentes
import { Button } from '@/components/ui';
import { BsFillHousesFill } from 'react-icons/bs';
import { GrUserWorker } from 'react-icons/gr';
import { IoDocumentAttachOutline } from 'react-icons/io5';
import { FaRegNewspaper } from 'react-icons/fa';
import { GiVote } from 'react-icons/gi';
import { HiOutlineInboxArrowDown } from 'react-icons/hi2';

// Hooks
import Link from 'next/link';

// --------------------

const SectionPortal = () => {
    return (
        <div className="flex flex-col items-center w-[90%] gap-4 m-10">
            <div className="flex items-center justify-evenly w-full">
                <Link
                    href="portal/suppliers"
                    className="w-[85%] mb-5 justify-center flex"
                >
                    <Button className="flex flex-col justify-center items-center rounded-[40px] w-[90%] py-6">
                        <GrUserWorker size={45} />
                        <h1 className="text-2xl font-bold">Proveedores</h1>
                        <p className="w-2/3 text-base text-center ">
                            Tus proveedores y su información para una mejor
                            experiencia.
                        </p>
                    </Button>
                </Link>
                <Link
                    href="portal/messages"
                    className="w-[85%] mb-5 justify-center flex"
                >
                    <Button className="flex flex-col justify-center items-center rounded-[40px] w-[90%] py-6">
                        <HiOutlineInboxArrowDown size={45} />
                        <h1 className="text-2xl font-bold">Mensajería</h1>
                        <p className="w-2/3 text-base text-center ">
                            Reclamos, consultas, sugerencias y más de los
                            vecinos de tu consorcio.
                        </p>
                    </Button>
                </Link>
            </div>
            <div className="mb-4 text-4xl">
                <h1>Próximamente</h1>
            </div>
            <div className="flex items-center w-full gap-4">
                <div className="flex flex-col items-center justify-center w-2/3">
                    <BsFillHousesFill size={35} />
                    <h1 className="mt-1 text-xl">Amenities</h1>
                    <p className="text-center font-extralight">
                        Podrás gestionar los amenities desde aquí de forma
                        sencilla.
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center w-2/3">
                    <IoDocumentAttachOutline size={35} />
                    <h1 className="mt-1 text-xl">Documentos</h1>
                    <p className="text-center font-extralight">
                        Todos los documentos que necesites al alcance de un
                        click.
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center w-2/3">
                    <FaRegNewspaper size={35} />
                    <h1 className="mt-1 text-xl">Novedades</h1>
                    <p className="text-center font-extralight">
                        Todas las novedades del consorcio en un solo lugar.
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center w-2/3">
                    <GiVote size={35} />
                    <h1 className="mt-1 text-xl">Votaciones</h1>
                    <p className="text-center font-extralight">
                        Podrás participar en las votaciones a distancia.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SectionPortal;
