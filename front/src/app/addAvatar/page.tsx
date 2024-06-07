"use client";
import { Button, ContainerDashboard } from "@/components/ui";
import Link from "next/link";
import React, { useState } from "react";

const addAvatar: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);

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

    return (
        <ContainerDashboard className="w-[90%] h-[95vh] justify-center">
            <div className="w-1/2 mb-2 flex ">
                <Link
                    href="/dashboard/profile"
                    className="w-full flex justify-end"
                >
                    <Button className="w-32 py-2 rounded-[40px]">Volver</Button>
                </Link>
            </div>
            <div
                className="flex flex-col border border-dashed rounded-[40px] p-10 cursor-pointer items-center justify-center gap-3 w-1/2 h-3/4"
                onDragOver={preventDefaults}
                onDragEnter={preventDefaults}
                onDrop={handleDrop}
            >
                {image && (
                    <img src={image} alt="Preview" className=" max-w-80 mb-5" />
                )}
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
        </ContainerDashboard>
    );
};
export default addAvatar;
