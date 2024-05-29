"use client";
import React from "react";
import { Button, Input, Label } from "../ui";

const Register = () => {
    const handleSubmit = () => {};

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-fondo">
            <div className="w-[50%] bg-slate-200 p-10 rounded-md">
                <div className="mb-5 bg-red-300">
                    <h3>Registro</h3>
                    <p>
                        Crea una nueva cuenta para estar al alcance de tus
                        Expensas
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <Label>Nombre</Label>
                    <Input id="nombre" placeholder="nombre" />

                    <Label>Apellido</Label>
                    <Input id="apellido" placeholder="Apellido" />

                    <Label>Nombre</Label>
                    <Input placeholder="nombre" />

                    <Label>email</Label>
                    <Input placeholder="email" />

                    <Label>Password</Label>
                    <Input placeholder="Password" />

                    <Button type="submit">Registrase</Button>
                </form>
            </div>
        </div>
    );
};

export default Register;
