"use client";

// Estilos y componentes
import "./style.css";
import { Button, Input, Label } from "../ui";
import { PiEyeClosed, PiEye } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

// Validaciones
import { validateNombreCompleto } from "@/helpers/Validations/validate.nombre";
import { validateEmail } from "@/helpers/Validations/validate.email";
import { validatePwd } from "@/helpers/Validations/validate.password";

// Endpoint
import { registerFetch } from "@/helpers/fetch.helper.user";
import { apiUrl } from "@/helpers/fetch.helper";

// Hooks
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useSesion from "@/helpers/useSesion";
import Contact from "../Contact/Contact";

// ----------------------------

const Register = () => {
    const router = useRouter();
    const { token } = useSesion();
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
            Swal.fire({
                title: "Error al iniciar sesión",
                text: "Asegúrate de completar todos los campos del formulario.",
                icon: "error",
                confirmButtonColor: "#0b0c0d",
            });
        } else {
            try {
                const response = await registerFetch(registerData);
                if (response?.ok) {
                    Swal.fire({
                        title: `Bienvenid@, ${registerData.first_name}`,
                        text: "Logueate para poder continuar.",
                        icon: "success",
                        confirmButtonColor: "#0b0c0d",
                    }).then((res) => {
                        if (res.isConfirmed) {
                            router.push("/login");
                        }
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: "Error de información",
                    text: "Los datos que nos proporcionaste son inválidos.",
                    icon: "error",
                    confirmButtonColor: "#0b0c0d",
                });
            }
        }
    };

    useEffect(() => {
        const namesErrors = validateNombreCompleto(
            registerData.first_name,
            registerData.last_name
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

    const handleGoogle = async (e: any) => {
        window.location.href = `${apiUrl}/auth/google`;
    };

    if (token) {
        router.push("/dashboard");
    }

    return (
        <>
            <div className="flex flex-col w-screen h-full font-sans lg:flex-row contenedor">
                <Contact />
                <div className="flex flex-col items-center justify-center w-full p-8 space-y-6 text-white rounded-lg ">
                    <div className="flex w-full justify-star">
                        <Link
                            href="/"
                            className="text-[#696969] text-2xl hover:text-white duration-500 cursor-pointer"
                        >
                            Volver al inicio
                        </Link>
                    </div>
                    <h1 className="text-5xl font-bold">
                        ¡Empieza tu viaje con nosotros!
                    </h1>
                    <p className="text-lg">
                        Regístrate para empezar a disfrutar de nuestros
                        servicios.
                    </p>
                    <form
                        className="flex flex-col w-[25vw]"
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    >
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
                            <Label htmlFor="pwd">Contraseña:</Label>
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
                                className="w-8 ml-2"
                                onClick={handleLock}
                            >
                                {lock ? (
                                    <PiEyeClosed size={25} />
                                ) : (
                                    <PiEye size={25} />
                                )}{" "}
                            </button>
                        </div>

                        <div className="flex items-center justify-between w-full">
                            <Label htmlFor="pwd2">Repetir Contraseña:</Label>
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
                                className="w-8 ml-2"
                                onClick={handleLock}
                            >
                                {lock ? (
                                    <PiEyeClosed size={25} />
                                ) : (
                                    <PiEye size={25} />
                                )}{" "}
                            </button>
                        </div>
                        <div className="mt-10">
                            <Button
                                type="submit"
                                className="w-full py-2 text-black rounded-[50px] shadow-md bg-neutral-50 hover:bg-input hover:text-white disabled:pointer-events-none duration-500"
                            >
                                Registrase
                            </Button>
                        </div>

                        <div className="mt-5">
                            <button
                                type="button"
                                onClick={handleGoogle}
                                className="flex items-center justify-center gap-2 w-full py-2 text-black rounded-[50px] shadow-md bg-neutral-50 hover:bg-input hover:text-white disabled:pointer-events-none duration-500"
                            >
                                <FcGoogle size={20} />
                                Registrarse con Google
                            </button>
                        </div>
                    </form>
                    <div className="pt-2 mt-3">
                        <p className="mb-1 font-light text-center text-[#696969]">
                            ¿Ya estás registrado?
                            <br />
                            <a href="/login" className="text-blue-500 ">
                                Iniciar sesión
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
