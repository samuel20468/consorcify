"use client";
import React, { useEffect, useState } from "react";
import { Input, Button, Label } from "../ui";
import { ILoginData } from "@/Interfaces/Interfaces";
import { EyeIcon, EyeIconOff } from "@/helpers/icons.helper";
import { validateEmail } from "@/helpers/Validations/validate.email";
import { useRouter } from "next/navigation";
import { loginFetch } from "@/helpers/fetch.helper";
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const router = useRouter();
    const initialData = {
        email: "",
        password: "",
    };
    const [userData, setUserData] = useState<ILoginData>(initialData);
    const [errors, SetErrors] = useState(initialData);
    const [lock, setLock] = useState<boolean>(true);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        try {
            const response = await loginFetch(userData);

            const decodeData = jwtDecode(response.token);

            localStorage.setItem(
                "userData",
                JSON.stringify({ user: decodeData, token: response.token })
            );

            setUserData(initialData);
            SetErrors(initialData);
            router.push("/dashboard");
        } catch (error) {}
    };

    useEffect(() => {
        const liveErrors = validateEmail(userData.email);
        SetErrors((prevErrors) => ({
            ...prevErrors,
            ...liveErrors,
        }));

        console.log(errors);
    }, [userData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
        console.log(userData);
    };
    const handleLock = () => {
        setLock(!lock);
    };

    return (
        <div className="flex content-center justify-center text-black">
            <div className="px-10 pb-8 rounded-md w-[500px] bg-slate-200">
                <div className="mb-5 text-center">
                    <h3 className="mt-5 text-2xl font-bold">
                        Bienvenido a Consorcify
                    </h3>
                    <p className="font-light">Loggeate para ver tu cuenta.</p>
                </div>

                <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
                    <Label htmlFor="email">E-mail:</Label>
                    <Input
                        id="email"
                        name="email"
                        type="text"
                        placeholder="example@mail.com"
                        onChange={handleChange}
                        value={userData.email}
                    />

                    <Label htmlFor="password">Password:</Label>
                    <div className="flex items-center justify-between w-full h-10 rounded-md">
                        <Input
                            id="password"
                            name="password"
                            type={lock ? "password" : "text"}
                            placeholder="**********"
                            onChange={handleChange}
                            value={userData.password}
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
                        <Button type="submit">Iniciar Sesion</Button>
                    </div>
                </form>
                <div className="pt-2 mt-3">
                    <p className="mb-1 font-light text-center">
                        ¿Aún no estás registrado?{" "}
                        <a href="/register" className="text-blue-500">
                            Crea tu cuenta aqui
                        </a>
                    </p>
                    <p className="font-light text-center">
                        ¿Olvidaste tu contraseña?{" "}
                        <a href="#" className="text-blue-500">
                            Recupérala aqui
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
