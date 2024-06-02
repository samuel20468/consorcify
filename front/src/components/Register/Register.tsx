"use client";
import React, { useEffect, useState } from "react";
import { Button, Input, Label } from "../ui";
import { EyeIcon, EyeIconOff } from "@/helpers/icons.helper";
import { validateNombreCompleto } from "@/helpers/Validations/validate.nombre";
import { validateEmail } from "@/helpers/Validations/validate.email";
import { validatePwd } from "@/helpers/Validations/validate.password";
import { registerFetch } from "@/helpers/fetch.helper";
import { useRouter } from "next/navigation";

const Register = () => {
    const router = useRouter();
    const initialData = {
        first_name: "",
        last_name: "",
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
            !registerData.first_name ||
            !registerData.last_name ||
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
            registerData.first_name.trim(),
            registerData.last_name.trim()
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
        <div className="flex content-center justify-center text-black">
            <div className="px-10 pb-8 w-[500px] rounded-md bg-slate-200">
                <div className="mb-5 text-center">
                    <div>
                        <h3 className="mt-5 text-2xl font-bold">Registro</h3>
                        <p className="font-light">
                            Crea una nueva cuenta para estar al alcance de tus
                            Expensas
                        </p>
                    </div>
                </div>

                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <div className="flex items-center justify-between w-full">
                        <Label htmlFor="nombre">Nombre:</Label>
                        {errors.first_name && registerData.first_name && (
                            <span className="self-end text-xs text-red-500 ">
                                {errors.first_name}
                            </span>
                        )}
                    </div>
                    <Input
                        id="nombre"
                        name="first_name"
                        type="text"
                        placeholder="Nombre"
                        onChange={handlerChange}
                        value={registerData.first_name}
                    />

                    <div className="flex items-center justify-between w-full">
                        <Label htmlFor="apellido">Apellido:</Label>
                        {errors.last_name && registerData.last_name && (
                            <span className="self-end text-xs text-red-500 ">
                                {errors.last_name}
                            </span>
                        )}
                    </div>
                    <Input
                        id="apellido"
                        name="last_name"
                        type="text"
                        placeholder="Apellido"
                        onChange={handlerChange}
                        value={registerData.last_name}
                    />

                    <div className="flex items-center justify-between w-full">
                        <Label htmlFor="email">E-mail:</Label>
                        {errors.email && registerData.email && (
                            <span className="self-end text-xs text-red-500">
                                {errors.email}
                            </span>
                        )}
                    </div>
                    <Input
                        id="email"
                        name="email"
                        type="text"
                        placeholder="example@mail.com"
                        onChange={handlerChange}
                        value={registerData.email}
                    />

                    <div className="flex items-center justify-between w-full">
                        <Label htmlFor="pwd">Password:</Label>
                        {errors.password && registerData.password && (
                            <span className="self-end text-xs text-red-500 ">
                                {errors.password}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center justify-between w-full h-10 my-1 rounded-md">
                        <Input
                            id="pwd"
                            name="password"
                            type={lock ? "password" : "text"}
                            placeholder="**********"
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
                        <Label htmlFor="pwd2">Repetir Password:</Label>
                        {registerData.password &&
                            pass2 &&
                            registerData.password !== pass2.trim() && (
                                <span className="self-end text-xs text-red-500 ">
                                    Las contraseñas deben coincidir
                                </span>
                            )}
                    </div>

                    <div className="flex items-center justify-between w-full h-10 my-1 rounded-md ">
                        <Input
                            id="pwd2"
                            name="password2"
                            type={lock ? "password" : "text"}
                            placeholder="**********"
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
                    <div className="mt-4">
                        <Button type="submit">Registrase</Button>
                    </div>
                </form>
                <div className="pt-2 mt-3">
                    <p className="mb-1 font-light text-center">
                        ¿Ya estás registrado?{" "}
                        <a href="/login" className="text-blue-500">
                            Iniciar sesión
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
