'use client';

// Estilos y componentes
import { Button, ContainerDashboard, Title } from '@/components/ui';

// Endpoints
import {
    deleteMessageFromCAdmin,
    getMessageById,
} from '@/helpers/fetch.helper.messages';

// Interfaces

import { IMessage } from '@/Interfaces/message.interfaces';

// Hooks
import { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import useAuth from '@/helpers/useAuth';
import useSesion from '@/helpers/useSesion';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

// -------------------

const Supplier = () => {
    useAuth();
    const { token, data } = useSesion();
    const params: { id: string } = useParams();
    const [message, setMessage] = useState<IMessage>();
    const path = usePathname();
    const router = useRouter();

    useEffect(() => {
        const fecthData = async () => {
            try {
                const response = await getMessageById(params.id, token);
                if (response) {
                    const data = await response.json();
                    setMessage(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fecthData();
        }
    }, [path, token, params.id]);

    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        router.push('/dashboard/admin/portal/messages');
    };
    const handleDelete = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        Swal.fire({
            icon: 'warning',
            title: 'Eliminar Mensaje',
            text: '¿Está seguro que desea eliminar el mensaje?',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#c36961',
            confirmButtonColor: '#609e87',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deleteMessageFromCAdmin(
                        data.id,
                        params.id,
                        token
                    );
                    if (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Mensaje eliminado',
                            text: 'El mensaje se ha eliminado correctamente',
                            confirmButtonText: 'Aceptar',
                        });
                        router.push('/dashboard/admin/portal/messages');
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'No se ha podido eliminar el mensaje',
                            text: 'Intentelo mas tarde o contacta con soporte',
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
                    Portal{' '}
                    <span className="text-2xl font-thin">
                        | Mensajería |{' '}
                        <span className="text-xl font-thin">
                            {message?.consortium}
                        </span>
                    </span>
                </Title>
                <div className="flex flex-col mt-20 p-10 border w-[950px] rounded-[50px] text-black bg-neutral-50">
                    <div>
                        <h3 className="text-l my-2">
                            <span className="italic">Remitente:</span>{' '}
                            {message?.sender}
                        </h3>
                        <div className="flex justify-center border-b border-black "></div>
                    </div>
                    <div>
                        <h3 className="text-l my-2">
                            <span className="italic">Unidad Funcional:</span>{' '}
                            {message?.functional_unit}
                        </h3>
                        <div className="flex justify-center border-b border-black "></div>
                    </div>
                    <div>
                        <h3 className="text-l mya-2">
                            <span className="italic">Asunto:</span>{' '}
                            {message?.subject}
                        </h3>
                        <div className="flex justify-center border-b border-black "></div>
                    </div>
                    <div className="flex flex-col mt-10">
                        <h3 className="text-xl mb-2">Mensaje:</h3>
                        <p>{message?.content}</p>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-l text-right mt-10">
                            Enviado el: {message?.timestamp}
                        </h3>
                    </div>
                    <div className="flex w-full justify-evenly mt-10">
                        <Button
                            onClick={handleClick}
                            className="w-[20%] my-0 mx-auto rounded-lg bg-black border border-black text-white hover:border-none"
                        >
                            Volver atras
                        </Button>
                        <Button
                            onClick={handleDelete}
                            className="w-[20%] my-0 mx-auto rounded-lg bg-inherit border border-black bg-black text-white hover:border-none"
                        >
                            Eliminar Mensaje
                        </Button>
                    </div>
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default Supplier;
