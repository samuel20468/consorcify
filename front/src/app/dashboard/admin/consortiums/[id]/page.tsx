"use client";

// Estilos y contenedores
import { Button, ContainerDashboard, Title } from "@/components/ui";

// Endpoints
import {
    deleteConsortium,
    getConsortiumById,
} from "@/helpers/fetch.helper.consortium";

// Interfaces
import { IConsortium } from "@/Interfaces/consortium.interfaces";

// Hooks
import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import FormAddFuncionalUnit from "@/components/FormAddFuncionalUnit/page";
import Link from "next/link";
import Swal from "sweetalert2";

// --------------------

const ConsortiumId = () => {
    useAuth();
    const router = useRouter();
    const { token } = useSesion();
    const pathname = usePathname();
    const params: { id: string } = useParams();
    const [consortium, setConsortium] = useState<IConsortium>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getConsortiumById(params.id, token);
                if (response) {
                    const data = await response.json();
                    setConsortium(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fetchData();
        }
    }, [token, pathname, params.id]);

    const handleDelete = async () => {
        Swal.fire({
            icon: "warning",
            title: "Desactivar Consorcio",
            text: "¿Está seguro que desea desactivar el Consorcio?",
            showCancelButton: true,
            confirmButtonText: "Desactivar",
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#8b0000",
            confirmButtonColor: "#008f39",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deleteConsortium(
                        consortium?.id!,
                        token
                    );
                    if (response) {
                        Swal.fire({
                            icon: "success",
                            title: "Consorcio Desactivado",
                            text: "El Consorcio se ha desactivado correctamente",
                            confirmButtonText: "Aceptar",
                        });
                        router.push("/dashboard/admin/consortiums");
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "No se ha podido desactivar el Consorcio",
                            text: "Intentelo mas tarde o contacta con el administrador",
                            confirmButtonText: "Aceptar",
                        });
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        });
    };

    return (
        <ContainerDashboard className="w-[90%] h-[90vh]">
            <Title>
                <Link href="/dashboard/admin/consortiums">Consorcios </Link>
                <span className="text-xl font-thin">| {consortium?.name}</span>
            </Title>

            <div className="w-[90%] h-full border rounded-[40px] flex justify-center items-center flex-col">
                <div className="w-full h-[40%]  p-2 flex justify-center items-center">
                    <img
                        src={consortium?.picture}
                        alt={consortium?.name}
                        className="max-h-[250px] h-auto"
                    />
                </div>
                <div className="w-[90%] h-[10%] border p-2 flex justify-center items-center flex-col text-black bg-gray-50 rounded-[40px]">
                    <p className="text-2xl font-bold">
                        {consortium?.street_name} -{" "}
                        {consortium?.building_number} - CP:{" "}
                        {consortium?.zip_code}
                    </p>
                    <p>
                        {consortium?.city} - {consortium?.province} -{" "}
                        {consortium?.country}
                    </p>
                </div>
                <div className="w-full h-[50%] p-2 flex justify-around py-5 items-center flex-col">
                    <h2>Detalles del Consorcio</h2>
                    <div className="flex items-center justify-center w-full ">
                        <div className="flex items-center justify-center w-1/3 gap-1 border rounded-lg">
                            <p className="flex justify-start w-1/3">
                                Unidades Funcionales:{" "}
                            </p>
                            <p className="flex justify-center w-1/3">
                                {consortium?.ufs}
                            </p>
                        </div>
                        <div className="flex items-center justify-center w-1/3 gap-1 border rounded-lg">
                            <p className="flex justify-start w-1/3">
                                Categoria:{" "}
                            </p>
                            <p className="flex justify-center w-1/3">
                                {consortium?.category}
                            </p>{" "}
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-full ">
                        <div className="flex items-center justify-center w-1/3 gap-1 border rounded-lg">
                            <p className="flex justify-start w-1/3">Pisos: </p>
                            <p className="flex justify-center w-1/3">
                                {consortium?.floors}
                            </p>
                        </div>
                        <div className="flex items-center justify-center w-1/3 gap-1 border rounded-lg">
                            <p className="flex justify-start w-1/3">
                                Clave Suterh:{" "}
                            </p>
                            <p className="flex justify-center w-1/3">
                                {consortium?.suterh_key}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-full ">
                        <div className="flex items-center justify-center w-1/3 gap-1 border rounded-lg">
                            <p className="flex justify-start w-1/3">
                                Vencimiento Expensas:{" "}
                            </p>
                            <p className="flex justify-center w-1/3">
                                {consortium?.first_due_day}
                            </p>
                        </div>
                        <div className="flex items-center justify-center w-1/3 gap-1 border rounded-lg">
                            <p className="flex justify-start w-1/3">
                                Interes por Vencimiento:{" "}
                            </p>
                            <p className="flex justify-center w-1/3">
                                {consortium?.interest_rate}%
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-full ">
                        <div className="flex items-center justify-center w-1/3 gap-1 border rounded-lg">
                            <p className="flex justify-start w-1/3">CUIT: </p>
                            <p className="flex justify-center w-1/3">
                                {consortium?.cuit}
                            </p>
                        </div>
                        <div className="flex items-center justify-center w-1/3 gap-1 border rounded-lg">
                            <p className="flex justify-start w-1/3">Activo: </p>
                            <p className="flex justify-center w-1/3">
                                {consortium?.active ? "Activo" : "Inactivo"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center w-full ">
                        <div className="flex items-center justify-center w-1/3 gap-1 border rounded-lg">
                            <p className="flex justify-start w-1/3">
                                Nombre del Administrador:{" "}
                            </p>
                            <p className="flex justify-center w-1/3">
                                {consortium?.c_admin.name}
                            </p>
                        </div>
                        <div className="flex items-center justify-center w-1/3 gap-1 border rounded-lg">
                            <p className="flex justify-start w-1/3">
                                Email del Administrador:{" "}
                            </p>
                            <p className="flex justify-center w-1/3">
                                {consortium?.c_admin.email}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end w-[85%] py-2 gap-2">
                <Link
                    href={`/dashboard/admin/consortiums/unidadesFuncionales/${consortium?.id}`}
                >
                    <Button className="w-44 py-2 rounded-[40px]">
                        Unidades Funcionales
                    </Button>
                </Link>
                <Link href={`/updateConsortium/${consortium?.id}`}>
                    <Button className="w-44 py-2 rounded-[40px]">
                        Modificar Consorcio
                    </Button>
                </Link>
                <Button
                    className="w-44 py-2 rounded-[40px]"
                    onClick={handleDelete}
                >
                    Desactivar Consorcio
                </Button>
                <Link
                    href={`/dashboard/admin/consortiums/${params.id}/${consortium?.id}`}
                    as={`/dashboard/admin/consortiums/${params.id}/addunidad`}
                >
                    <Button className="w-44 py-2 rounded-[40px]">
                        Agregar Unidad Funcional
                    </Button>
                </Link>
            </div>
        </ContainerDashboard>
    );
};

export default ConsortiumId;
