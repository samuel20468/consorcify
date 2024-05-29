"use client";
import React, { useEffect, useState } from "react";
import { Input, Button, Label } from "../ui";
import { ILoginData } from "@/Interfaces/Interfaces";
import { EyeIcon, EyeIconOff } from "@/helpers/icons.helper";
import { validateEmail } from "@/helpers/Validations/validate.email";
import { useRouter } from "next/navigation";

const Login = () => {
    const router = useRouter();
    const initialData = {
        email: "",
        password: "",
    };
    const [userData, setUserData] = useState<ILoginData>(initialData);
    const [errors, SetErrors] = useState(initialData);
    const [lock, setLock] = useState<boolean>(true);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        try {
            alert("Loggin correcto");
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
        <div className="flex flex-col items-center justify-center w-screen h-screen gap-2 bg-fondo">
            <div className="p-10 rounded-md bg-slate-200">
                <h3 className="my-5 font-bold">Bienvenido a Consorcify</h3>
                <p>bienvenido nuevamente. Loggeate para ver tu cuenta.</p>

                <form className="" onSubmit={handleSubmit}>
                    <Label>E-mail</Label>
                    <Input
                        id="email"
                        name="email"
                        type="text"
                        placeholder="example@mail.com"
                        onChange={handleChange}
                        value={userData.email}
                    />

                    <Label>Password</Label>
                    <div className="flex justify-between w-full h-10 rounded-md bg-input">
                        <Input
                            id="password"
                            name="password"
                            type={lock ? "password" : "text"}
                            placeholder="*****************"
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

                    <Button type="submit">Iniciar Sesion</Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
