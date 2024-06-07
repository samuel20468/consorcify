"use client";
import { Button, ContainerDashboard } from "@/components/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

const addAvatar: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const router = useRouter();
    console.log(image);

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
            if (typeof result === "string") {
                setImage(result);
            }
        };
        reader.readAsDataURL(file);
    };

    const preventDefaults = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleSubmit = () => {
        Swal.fire({
            icon: "success",
            title: "Tu imagen se actualizó exitosamente",
        }).then((result) => {
            if (result.isConfirmed) {
                router.push("/dashboard/profile");
            }
        });
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
                    <img
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
