"use client";
import React, { useEffect, useState } from "react";
import { Button, Input, Label } from "../ui";
import { EyeIcon, EyeIconOff } from "@/helpers/icons.helper";
import { validateNombreCompleto } from "@/helpers/Validations/validate.nombre";
import { validateEmail } from "@/helpers/Validations/validate.email";
import { validatePwd } from "@/helpers/Validations/validate.password";
import { registerFetch } from "@/helpers/button.helper";
import { useRouter } from "next/navigation";

const Register = () => {
    const router = useRouter();
    const initialData = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    };
    const [registerData, setRegisterData] = useState(initialData);
    const [pass2, setPass2] = useState("");
    const [lock, setLock] = useState<boolean>(true);
    const [errors, SetErrors] = useState(initialData);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            !registerData.firstName ||
            !registerData.lastName ||
            !registerData.email ||
            !registerData.password
        ) {
            alert("faltan datos en el formulario");
            return;
        }

        try {
            const response = await registerFetch(registerData);
            if (response?.ok) {
                alert("Registro exitoso, Loggeate para continuar");
                router.push("/login");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const namesErrors = validateNombreCompleto(
            registerData.firstName.trim(),
            registerData.lastName.trim()
        );
        const emailErrors = validateEmail(registerData.email);
        const pwdErrors = validatePwd(registerData.password);

        SetErrors((prevErrors) => ({
            ...prevErrors,
            ...namesErrors,
            ...emailErrors,
            ...pwdErrors,
        }));
    }, [registerData]);
    console.log(errors);

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterData({
            ...registerData,
            [name]: value,
        });
    };
    const handlePass2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPass2(e.target.value);
        console.log(pass2);
    };
    const handleLock = () => {
        setLock(!lock);
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-fondo">
            <div className="flex flex-col gap-3 w-[50%] bg-slate-200 p-10 rounded-md">
                <div className="mb-5">
                    <h3 className="font-bold">Registro</h3>
                    <p>
                        Crea una nueva cuenta para estar al alcance de tus
                        Expensas
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between w-full">
                        <Label>Nombre</Label>
                        {errors.firstName && registerData.firstName && (
                            <span className="self-end text-xs text-red-500 ">
                                {errors.firstName}
                            </span>
                        )}
                    </div>
                    <Input
                        id="nombre"
                        name="firstName"
                        type="text"
                        placeholder="nombre"
                        onChange={handlerChange}
                        value={registerData.firstName}
                    />

                    <div className="flex items-center justify-between w-full">
                        <Label>Apellido</Label>
                        {errors.lastName && registerData.lastName && (
                            <span className="self-end text-xs text-red-500 ">
                                {errors.lastName}
                            </span>
                        )}
                    </div>
                    <Input
                        id="apellido"
                        name="lastName"
                        type="text"
                        placeholder="Apellido"
                        onChange={handlerChange}
                        value={registerData.lastName}
                    />

                    <div className="flex items-center justify-between w-full">
                        <Label>email</Label>
                        {errors.email && registerData.email && (
                            <span className="self-end text-xs text-red-500 ">
                                {errors.email}
                            </span>
                        )}
                    </div>
                    <Input
                        id="email"
                        name="email"
                        type="text"
                        placeholder="email"
                        onChange={handlerChange}
                        value={registerData.email}
                    />

                    <div className="flex items-center justify-between w-full">
                        <Label>Password</Label>
                        {errors.password && registerData.password && (
                            <span className="self-end text-xs text-red-500 ">
                                {errors.password}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center justify-between w-full h-10 rounded-md">
                        <Input
                            id="pwd"
                            name="password"
                            type={lock ? "password" : "text"}
                            placeholder="Password"
                            onChange={handlerChange}
                            value={registerData.password}
                        />
                        <button
                            type="button"
                            className="w-8 p-1"
                            onClick={handleLock}
                        >
                            {lock ? <EyeIconOff /> : <EyeIcon />}
                        </button>
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <Label>Repetir Password</Label>
                        {registerData.password &&
                            pass2 &&
                            registerData.password !== pass2.trim() && (
                                <span className="self-end text-xs text-red-500 ">
                                    Las contraseñas deben coincidir
                                </span>
                            )}
                    </div>

                    <div className="flex items-center justify-between w-full h-10 rounded-md ">
                        <Input
                            id="pwd2"
                            name="password2"
                            type={lock ? "password" : "text"}
                            placeholder="Repetir password"
                            onChange={handlePass2}
                            value={pass2}
                        />
                        <button
                            type="button"
                            className="w-8 p-1"
                            onClick={handleLock}
                        >
                            {lock ? <EyeIconOff /> : <EyeIcon />}
                        </button>
                    </div>
                    <Button type="submit">Registrase</Button>
                </form>
                <div className="mt-3">
                    <p>
                        Ya estas Registrado?<a href="/login">Inicia Sesion</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
