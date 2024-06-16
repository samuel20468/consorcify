"use client";

// Estilos y componentes
import "./style.css";
import { Input, Button, Label } from "../ui";
import { PiEyeClosed, PiEye } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

// Validaciones
import { validateEmail } from "@/helpers/Validations/validate.email";

// Interfaces
import { ILogin } from "@/Interfaces/user.interfaces";
import { jwtDecode } from "jwt-decode";

// Endpoints
import { loginFetch, resetPasswordFetch } from "@/helpers/fetch.helper.user";
import { apiUrl } from "@/helpers/fetch.helper";

// Hooks
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSesion from "@/helpers/useSesion";
import Contact from "../Contact/Contact";
import Link from "next/link";

// ----------------------------

const Login = () => {
    const router = useRouter();
    const { token } = useSesion();
    const initialData = {
        email: "",
        password: "",
    };
    const [userData, setUserData] = useState<ILogin>(initialData);
    const [errors, SetErrors] = useState(initialData);
    const [lock, setLock] = useState<boolean>(true);
    const [show, setShow] = useState<boolean>(true);
    const [email, setEmail] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();

        if (!userData.email || !userData.password) {
            Swal.fire({
                title: "Error al iniciar sesión",
                text: "Asegúrate de completar todos los campos del formulario.",
                icon: "error",
                confirmButtonColor: "#0b0c0d",
            });
        } else {
            try {
                const response = await loginFetch(userData);
                const decodeData = jwtDecode(response.token);
                localStorage.setItem(
                    "userData",
                    JSON.stringify({ user: decodeData, token: response.token })
                );
                Swal.fire({
                    title: "Bienvenido de nuevo",
                    icon: "success",
                    confirmButtonColor: "#0b0c0d",
                }).then((res) => {
                    if (res.isConfirmed) {
                        setUserData(initialData);
                        SetErrors(initialData);
                        router.push("/dashboard");
                    }
                });
            } catch (error) {
                Swal.fire({
                    title: "Error de información",
                    text: (error as Error).message,
                    icon: "error",
                    confirmButtonColor: "#0b0c0d",
                });
            }
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        if (token) {
            const decodedData = jwtDecode(token);
            localStorage.setItem(
                "userData",
                JSON.stringify({ user: decodedData, token })
            );
            router.push("/dashboard");
        }
    }, [router]);

    useEffect(() => {
        const liveErrors = validateEmail(userData.email);
        SetErrors((prevErrors) => ({
            ...prevErrors,
            ...liveErrors,
        }));
    }, [userData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleLock = () => {
        setLock(!lock);
    };

    const handleGoogle = async (e: any) => {
        window.location.href = `${apiUrl}/auth/google/callback`;
    };

    if (token) {
        router.push("/dashboard");
    }

    const handleChangePassword = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { value } = e.target;
        setEmail(value);
    };

    const handleSubmitPassword = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!email) {
            Swal.fire({
                title: "Error",
                text: "Asegúrate de completar el correo electrónico.",
                icon: "error",
                confirmButtonColor: "#0b0c0d",
            });
        } else {
            try {
                const response = await resetPasswordFetch(email);
                if (response?.ok) {
                    Swal.fire({
                        title: "Verifica tu Casilla de Email",
                        icon: "success",
                        confirmButtonColor: "#0b0c0d",
                    });
                } else {
                    Swal.fire({
                        title: "Error de información",
                        text: "El correo electrónico no está en la base de datos.",
                        icon: "error",
                        confirmButtonColor: "#0b0c0d",
                    });
                }
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: "Error de información",
                    text: (error as Error).message,
                    icon: "error",
                    confirmButtonColor: "#0b0c0d",
                });
            }
        }
    };

    const handleShow = () => {
        setShow(!show);
    };

    return (
        <>
            <div className="flex flex-col w-screen h-[700px] font-sans lg:flex-row contenedor">
                <Contact />
                {show ? (
                    <div className="flex flex-col items-center justify-center w-full p-8 space-y-6 text-white rounded-lg imagen">
                        <div className="flex w-full justify-start">
                            <Link
                                href="/"
                                className="text-[#696969] text-2xl hover:text-white duration-500 cursor-pointer"
                            >
                                Volver al inicio
                            </Link>
                        </div>
                        <h1 className="text-5xl font-bold">
                            ¡Nos alegra verte de nuevo!
                        </h1>
                        <p className="text-lg">
                            Inicia sesión para acceder a tu cuenta.
                        </p>
                        <form
                            className="w-[25vw] flex flex-col gap-1"
                            onSubmit={handleSubmit}
                            autoComplete="off"
                        >
                            <div className="flex items-center justify-between w-full">
                                <Label htmlFor="email">E-mail:</Label>
                                {errors.email && userData.email && (
                                    <span className="self-end text-xs text-red-500">
                                        {errors.email}
                                    </span>
                                )}
                            </div>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="example@mail.com"
                                onChange={handleChange}
                                value={userData.email}
                            />

                            <Label htmlFor="password">Contraseña:</Label>
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
                                    className="w-8 ml-2"
                                    onClick={handleLock}
                                >
                                    {lock ? (
                                        <PiEyeClosed size={25} />
                                    ) : (
                                        <PiEye size={25} />
                                    )}
                                </button>
                            </div>
                            <div className="mt-10">
                                <Button
                                    type="submit"
                                    className="w-full py-2 text-black rounded-[50px] shadow-md bg-neutral-50 hover:bg-input hover:text-white disabled:pointer-events-none duration-500"
                                >
                                    Iniciar sesión
                                </Button>
                            </div>

                            <div className="mt-5">
                                <Button
                                    onClick={handleGoogle}
                                    type="button"
                                    className="flex items-center justify-center gap-2 w-full py-2 text-black rounded-[50px] shadow-md bg-neutral-50 hover:bg-input hover:text-white disabled:pointer-events-none duration-500"
                                >
                                    <FcGoogle size={20} />
                                    Iniciar sesión con Google
                                </Button>
                            </div>
                        </form>
                        <div className="pt-2 mt-3">
                            <p className="mb-1 font-light text-center text-[#696969]">
                                ¿Aún no estás registrado?
                                <br />
                                <a href="/register" className="text-blue-500">
                                    Crea tu cuenta aquí
                                </a>
                            </p>
                            <p className="font-light text-center text-[#696969]">
                                ¿Olvidaste tu contraseña?
                                <br />
                                <button
                                    onClick={handleShow}
                                    className="text-blue-500"
                                >
                                    Recupérala aqui
                                </button>
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-between w-full p-8 space-y-6 text-white rounded-lg imagen">
                        <div className="flex w-full justify-start">
                            <Link
                                href="/"
                                className="text-[#696969] text-2xl hover:text-white duration-500 cursor-pointer"
                            >
                                Volver al inicio
                            </Link>
                        </div>
                        <div className="flex flex-col gap-2 items-center justify-center w-full h-full">
                            <h1 className="text-5xl font-bold">
                                ¡Recupera tu contraseña!
                            </h1>
                            <p className="text-lg">
                                Ingresa tu mail para recuperar tu contraseña.
                            </p>
                            <form
                                onSubmit={handleSubmitPassword}
                                className="w-[25vw] flex flex-col gap-1"
                                autoComplete="off"
                            >
                                <div className="flex items-center justify-between w-full">
                                    <Label htmlFor="email">E-mail:</Label>
                                    {errors.email && userData.email && (
                                        <span className="self-end text-xs text-red-500">
                                            {errors.email}
                                        </span>
                                    )}
                                </div>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="example@mail.com"
                                    onChange={handleChangePassword}
                                    value={email}
                                />
                                <div className="mt-10">
                                    <Button
                                        type="submit"
                                        className="w-full py-2 text-black rounded-[50px] shadow-md bg-neutral-50 hover:bg-input hover:text-white disabled:pointer-events-none duration-500"
                                    >
                                        Recuperar contraseña
                                    </Button>
                                </div>
                                <div className="pt-2 mt-3">
                                    <p className="mb-1 font-light text-center text-[#696969]">
                                        ¿Aún no estás registrado?
                                        <br />
                                        <button
                                            onClick={handleShow}
                                            className=" text-indigo-600"
                                        >
                                            Volver al Login
                                        </button>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Login;
