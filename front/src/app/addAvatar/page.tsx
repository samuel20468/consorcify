'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Button, ContainerDashboard } from '../../components/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useSesion from '@/helpers/useSesion';
import Image from 'next/image';

import {
    handleDrop,
    handleErrorResponse,
    handleFileChange,
    handleSuccessResponse,
    preventDefaults,
    uploadImage,
} from '@/helpers/toUpdateImage/updateImage.helper';

const AddAvatar: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const router = useRouter();
    const { token } = useSesion();
    const id = userData?.user.id;
    const role = userData?.user.roles[0];

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
            console.log(storedUserData);
        }
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (
            fileInputRef.current &&
            fileInputRef.current.files &&
            fileInputRef.current.files.length > 0
        ) {
            const formData = new FormData();
            formData.append('image', fileInputRef.current.files[0]);
            try {
                const endpoint =
                    role === 'user'
                        ? `update-user/${id}`
                        : `update-cadmin/${id}`;
                const response = await uploadImage(formData, endpoint, token);
                if (response.ok) {
                    handleSuccessResponse(router);
                } else {
                    throw new Error(
                        'Hubo un error al actualizar tu imagen de perfil.'
                    );
                }
            } catch (error: any) {
                handleErrorResponse(error);
            }
        }
    };

    return (
        <ContainerDashboard className="w-[90%] h-[90vh] justify-center">
            <div className="flex w-1/2 my-2 justify-center">
                <Link href="/dashboard/profile">
                    <Button className="py-2 w-36 rounded-[40px]">Volver</Button>
                </Link>
            </div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col border border-dashed rounded-[40px] p-10 cursor-pointer items-center justify-between gap-3 w-1/2 h-3/4"
            >
                <div
                    className="flex flex-col border border-dashed rounded-[40px] p-10 cursor-pointer items-center justify-between h-3/4"
                    onDragOver={(event) => preventDefaults(event)}
                    onDragEnter={(event) => preventDefaults(event)}
                    onDrop={(event) =>
                        handleDrop(event, setImage, fileInputRef)
                    }
                >
                    {image ? (
                        <Image
                            src={image}
                            alt="Preview"
                            className="object-cover w-full h-full"
                            width={300}
                            height={300}
                        />
                    ) : (
                        <p>
                            Arrastra y suelta una imagen aquí o usa el input de
                            abajo
                        </p>
                    )}
                </div>
                <label
                    htmlFor="fileInput"
                    className="px-5 py-2 rounded-[40px] bg-[#e5e7eb] text-black cursor-pointer"
                >
                    Seleccionar Imagen
                </label>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(event) => handleFileChange(event, setImage)}
                    id="fileInput"
                    className="hidden"
                />
                <div className="self-end w-full ">
                    <Button
                        type="submit"
                        className="w-full py-2 rounded-[40px]"
                    >
                        Enviar
                    </Button>
                </div>
            </form>
        </ContainerDashboard>
    );
};

export default AddAvatar;
