"use client";

// Estilos y componentes
import { Button, ContainerDashboard } from "@/components/ui";
import { formatearNumero } from "@/helpers/functions.helper";
import Swal from "sweetalert2";

// Endpoints
import {
    deleteConsortium,
    getConsortiumById,
} from "@/helpers/fetch.helper.consortium";

// Interfaces
import { IConsortium } from "@/Interfaces/consortium.interfaces";

// Hooks
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import Link from "next/link";

// ---------------------

const Page = () => {
    useAuth();
    const params: { id: string } = useParams();
    const { token } = useSesion();
    const router = useRouter();
    const [consorcio, setConsorcio] = useState<IConsortium>();
    const [cuit, setCuit] = useState<string>("");

    useEffect(() => {
        const fetchData = async (token: string) => {
            const response = await getConsortiumById(params.id, token);
            const data = await response?.json();
            setConsorcio(data);
        };
        try {
        } catch (error) {
            console.error(error);
        }
        if (token) {
            fetchData(token);
        }
    }, [token, params.id]);

    useEffect(() => {
        if (consorcio) {
            const formatedCuit = formatearNumero(consorcio?.cuit!);
            setCuit(formatedCuit);
        }
    });

    const handleDelete = async () => {
        Swal.fire({
            icon: "warning",
            title: "Estás seguro?",
            text: `Te recuerdo que si borras el consorcio ${consorcio?.name} no podrás volver atrás.`,
            showCancelButton: true,
            confirmButtonColor: "#008f39",
            cancelButtonColor: "#8b0000",
            confirmButtonText: "Si, borrarlo!",
            cancelButtonText: "No, cancelar!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deleteConsortium(params.id, token);
                    Swal.fire({
                        title: "Consorcio borrado!",
                        text: `El consorcio ${consorcio?.name} fue borrado correctamente`,
                        icon: "success",
                    });
                    router.push("/dashboard/superadmin/consorcios/All");
                } catch (error) {
                    console.error(error);
                }
            }
        });
    };

    return (
        <ContainerDashboard className="flex items-center justify-center w-full h-[93vh] bg-[#e5e7eb]">
            <div className="flex flex-col items-center w-1/2 h-full p-8 m-5  rounded-[50px] justify-evenly border border-slate-100 bg-[#dadada] drop-shadow-2xl shadow-black">
                <div className="flex justify-end w-full">
                    <Link
                        href="/dashboard/superadmin/consorcios/All"
                        className=""
                    >
                        <Button className="w-32 py-2 rounded-[40px]">
                            Volver
                        </Button>
                    </Link>
                </div>
                <div className="w-40 p-2 border rounded-md">
                    <img
                        src="https://i.pinimg.com/564x/47/f2/10/47f2109057d426d054e473fccff5faea.jpg"
                        alt={consorcio?.name}
                        className="rounded-md"
                    />
                </div>
                <div className="flex flex-col w-full h-full gap-2 m-3 ">
                    <h3 className="self-center text-2xl text-fondo">
                        {consorcio?.name}
                    </h3>
                    <p className="px-5 py-4  rounded-[50px] bg-[#e5e7eb] shadow text-fondo border-fondo">
                        Administrador: {consorcio?.c_admin?.name}
                    </p>
                    <p className="px-5 py-4  rounded-[50px] bg-[#e5e7eb] shadow text-fondo border-fondo">
                        CATEGORIA: {consorcio?.category}
                    </p>
                    <p className="px-5 py-4  rounded-[50px] bg-[#e5e7eb] shadow text-fondo border-fondo">
                        DIRECCIÓN: {consorcio?.street_name}{" "}
                        {consorcio?.building_number}, {consorcio?.city} -{" "}
                        {consorcio?.province} - {consorcio?.country}
                    </p>
                    <p className="px-5 py-4  rounded-[50px] bg-[#e5e7eb] shadow text-fondo border-fondo">
                        CUIT: {cuit}
                    </p>
                    <p className="px-5 py-4  rounded-[50px] bg-[#e5e7eb] shadow text-fondo border-fondo">
                        VENCIMIENTO EXPENSAS(dia del mes):{" "}
                        {consorcio?.first_due_day}
                    </p>
                    <p className="px-5 py-4  rounded-[50px] bg-[#e5e7eb] shadow text-fondo border-fondo">
                        PISOS: {consorcio?.floors}
                    </p>
                    <p className="px-5 py-4  rounded-[50px] bg-[#e5e7eb] shadow text-fondo border-fondo">
                        UNIDADES FUNCIONALES: {consorcio?.ufs}
                    </p>
                </div>
                <div className="flex justify-end w-full gap-3 border-black">
                    <Link href={`/updateConsortium/${consorcio?.id}`}>
                        <button className="p-3 rounded-[50px] bg-fondo hover:bg-slate-50 hover:text-black">
                            Modificar Info
                        </button>
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="px-5 rounded-[50px] bg-fondo hover:bg-slate-50 hover:text-black"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </ContainerDashboard>
    );
};

export default Page;
