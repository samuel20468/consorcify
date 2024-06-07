"use client";
import { ContainerDashboard } from "@/components/ui";
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
            <div
                className="flex flex-col border rounded-[40px] p-10 cursor-pointer items-center justify-center gap-3"
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
