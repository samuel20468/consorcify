'use client';

// Estilos y contenedores
import { Button, ContainerDashboard, Title } from '@/components/ui';
import { formatearNumero } from '@/helpers/functions.helper';
import Map from '@/components/Map/Map';

// Endpoints
import {
    deleteConsortium,
    getConsortiumById,
} from '@/helpers/fetch.helper.consortium';

// Interfaces
import { IConsortium } from '@/Interfaces/consortium.interfaces';

// Hooks
import { useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import useAuth from '@/helpers/useAuth';
import useSesion from '@/helpers/useSesion';
import Link from 'next/link';
import Swal from 'sweetalert2';

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
            icon: 'warning',
            title: 'Desactivar Consorcio',
            text: '¿Está seguro que desea desactivar el Consorcio?',
            showCancelButton: true,
            confirmButtonText: 'Desactivar',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#c36961',
            confirmButtonColor: '#609e87',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deleteConsortium(
                        consortium?.id!,
                        token
                    );
                    if (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Consorcio Desactivado',
                            text: 'El Consorcio se ha desactivado correctamente',
                            confirmButtonText: 'Aceptar',
                        });
                        router.push('/dashboard/admin/consortiums');
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'No se ha podido desactivar el Consorcio',
                            text: 'Intentelo mas tarde o contacta con el administrador',
                            confirmButtonText: 'Aceptar',
                        });
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        });
    };

    return (
        <div className="h-screen">
            <ContainerDashboard>
                <Title>
                    Consorcios{' '}
                    <span className="text-2xl font-thin">
                        | {consortium?.name}
                    </span>
                </Title>
                <div className="flex flex-col items-center gap-4 p-4 mt-5 border grad">
                    <div className="flex w-full h-3/5">
                        <div className="w-1/3">
                            <img
                                className="h-full rounded-[40px]"
                                src={consortium?.picture}
                                alt={consortium?.name}
                            />
                        </div>
                        <div className="flex flex-col justify-center w-2/3 py-2">
                            <div className="mb-5 text-center">
                                <h1 className="text-4xl font-bold">
                                    {consortium?.name}
                                </h1>
                            </div>
                            <div className="flex flex-col gap-2 px-2 text-center">
                                <div>
                                    <h1 className="text-xl font-extralight">
                                        <span className="font-bold">CUIT:</span>{' '}
                                        {formatearNumero(consortium?.cuit!)}
                                    </h1>
                                </div>
                                <div>
                                    <h1 className="text-xl font-extralight">
                                        <span className="font-bold">
                                            Dirección:
                                        </span>{' '}
                                        {consortium?.street_name}{' '}
                                        {consortium?.building_number} (
                                        {consortium?.city},{' '}
                                        {consortium?.province},{' '}
                                        {consortium?.country})
                                    </h1>
                                </div>
                                <div>
                                    <h1 className="text-xl font-extralight">
                                        <span className="font-bold">
                                            Administrador:
                                        </span>{' '}
                                        {consortium?.c_admin.name}
                                    </h1>
                                </div>
                                <div className="flex justify-evenly">
                                    <h1 className="text-xl font-extralight">
                                        <span className="font-bold">
                                            Categoría del edificio:
                                        </span>{' '}
                                        {consortium?.category}
                                    </h1>
                                    <h1 className="text-xl font-extralight">
                                        <span className="font-bold">
                                            Clave SUTERH:
                                        </span>{' '}
                                        {consortium?.suterh_key}
                                    </h1>
                                </div>
                                <div className="flex justify-evenly">
                                    <h1 className="text-xl font-extralight">
                                        <span className="font-bold">
                                            Cantidad de pisos:
                                        </span>
                                        {'  '}
                                        {consortium?.floors}
                                    </h1>
                                    <h1 className="text-xl font-extralight">
                                        <span className="font-bold">
                                            Unidades funcionales:
                                        </span>{' '}
                                        {consortium?.ufs}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-2/5">
                        {consortium && (
                            <Map
                                lat={consortium.latitude}
                                lng={consortium.longitude}
                            />
                        )}
                    </div>
                </div>
                <div className="flex justify-around w-[70%] my-5 gap-2">
                    <Link
                        href={`/dashboard/admin/consortiums/unidadesFuncionales/${consortium?.id}`}
                    >
                        <Button className="w-44 py-2 rounded-[40px]">
                            Ver Unidades Funcionales
                        </Button>
                    </Link>
                    <Link
                        href={`/dashboard/admin/consortiums/${params.id}/${consortium?.id}`}
                        as={`/dashboard/admin/consortiums/${params.id}/addunidad`}
                    >
                        <Button className="w-44 py-2 rounded-[40px]">
                            Agregar Unidad Funcional
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
                    <Link href="/dashboard/admin/consortiums">
                        <Button className="w-44 py-2 rounded-[40px]">
                            Volver
                        </Button>
                    </Link>
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default ConsortiumId;
