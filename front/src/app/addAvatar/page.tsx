'use client';
import { Button, ContainerDashboard } from '@/components/ui';
import { apiUrl } from '@/helpers/fetch.helper';
import useSesion from '@/helpers/useSesion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const addAvatar: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const router = useRouter();
    const { token } = useSesion();
    const id = userData?.user.id;
    const rol = userData?.user.roles[0];

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
            console.log(storedUserData);
        }
    }, []);
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            showImage(file);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files?.[0];
        if (file) {
            showImage(file);
        }
    };

    const showImage = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result;
            if (typeof result === File) {
                setImage(result);
            }
        };
        reader.readAsDataURL(file);
    };

    const preventDefaults = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleSubmit = async () => {
        if (!image) return;

        const formData = new FormData();
        formData.append('image', image);

        try {
            if (rol === 'user') {
                const response = await fetch(
                    `${apiUrl}/pictures/update-user/${id}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        },
                        body: formData,
                    }
                );

                if (!response.ok) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Se ha presentado un error al subir la imagen',
                        icon: 'error',
                        confirmButtonColor: '#0b0c0d',
                    });
                }
                Swal.fire({
                    icon: 'success',
                    title: 'Tu imagen se actualizó exitosamente',
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push('/dashboard/profile');
                    }
                });
            } else if (rol === 'cadmin') {
                const response = await fetch(
                    `${apiUrl}/pictures/update-cadmin/${id}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        },
                        body: formData,
                    }
                );
                console.log(response);

                if (!response.ok) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Se ha presentado un error al subir la imagen',
                        icon: 'error',
                        confirmButtonColor: '#0b0c0d',
                    });
                }
                Swal.fire({
                    icon: 'success',
                    title: 'Tu imagen se actualizó exitosamente',
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push('/dashboard/profile');
                    }
                });
            }
        } catch (error: any) {
            console.log(error.message);

            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonColor: '#0b0c0d',
            });
        }
    };

    return (
        <ContainerDashboard className="w-[90%] h-[90vh] justify-center">
            <div className="flex w-1/2 mb-2 ">
                <Link
                    href="/dashboard/profile"
                    className="flex justify-end w-full"
                >
                    <Button className="w-32 py-2 rounded-[40px]">Volver</Button>
                </Link>
            </div>
            <div
                className="flex flex-col border border-dashed rounded-[40px] p-10 cursor-pointer items-center justify-between gap-3 w-1/2 h-3/4"
                onDragOver={preventDefaults}
                onDragEnter={preventDefaults}
                onDrop={handleDrop}
            >
                {image && (
                    <Image
                        src={image}
                        alt="Preview"
                        className="mb-5 max-w-80 max-h-60"
                    />
                )}
                <div className="flex flex-col items-center justify-center h-full gap-2">
                    <label
                        htmlFor="fileInput"
                        className="px-5 py-2 rounded-[40px] bg-[#e5e7eb] text-black cursor-pointer"
                    >
                        Seleccionar Imagen
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        id="fileInput"
                        className="hidden"
                    />

                    <p>O arrastra una imagen y sueltala aqui</p>
                </div>
                <div className="self-end w-full ">
                    <Button
                        onClick={handleSubmit}
                        type="submit"
                        className="w-full py-2 rounded-[40px]"
                    >
                        Cambiar Imagen
                    </Button>
                </div>
            </div>
        </ContainerDashboard>
    );
};
export default addAvatar;
