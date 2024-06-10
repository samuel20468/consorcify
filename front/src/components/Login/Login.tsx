'use client';

// Estilos y componentes
import './style.css';
import { Input, Button, Label } from '../ui';
import { EyeIcon, EyeIconOff } from '@/helpers/icons.helper';
import { FcGoogle } from 'react-icons/fc';
import Swal from 'sweetalert2';

// Validaciones
import { validateEmail } from '@/helpers/Validations/validate.email';

// Interfaces
import { ILoginData } from '@/Interfaces/Interfaces';
import { jwtDecode } from 'jwt-decode';

// Endpoints
import { apiUrl, loginFetch } from '@/helpers/fetch.helper';

// Hooks
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useSesion from '@/helpers/useSesion';

// ----------------------------

const Login = () => {
    const router = useRouter();
    const { token } = useSesion();
    const initialData = {
        email: '',
        password: '',
    };
    const [userData, setUserData] = useState<ILoginData>(initialData);
    const [errors, SetErrors] = useState(initialData);
    const [lock, setLock] = useState<boolean>(true);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();

        if (!userData.email || !userData.password) {
            Swal.fire({
                title: 'Error al iniciar sesión',
                text: 'Asegúrate de completar todos los campos del formulario.',
                icon: 'error',
                confirmButtonColor: '#0b0c0d',
            });
        }
        try {
            const response = await loginFetch(userData);
            const decodeData = jwtDecode(response.token);
            localStorage.setItem(
                'userData',
                JSON.stringify({ user: decodeData, token: response.token })
            );
            Swal.fire({
                title: 'Bienvenido de nuevo',
                icon: 'success',
                confirmButtonColor: '#0b0c0d',
            }).then((res) => {
                if (res.isConfirmed) {
                    setUserData(initialData);
                    SetErrors(initialData);
                    router.push('/dashboard');
                }
            });
        } catch (error) {
            Swal.fire({
                title: 'Error de información',
                text: 'Los datos que nos proporcionaste son inválidos.',
                icon: 'error',
                confirmButtonColor: '#0b0c0d',
            });
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token) {
            const decodedData = jwtDecode(token);
            localStorage.setItem(
                'userData',
                JSON.stringify({ user: decodedData, token })
            );
            router.push('/dashboard');
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
        window.location.href = `${apiUrl}/auth/google`;
    };

    if (token) {
        router.push('/dashboard');
    }

    return (
        <>
            <div className="flex flex-col w-screen h-screen font-sans lg:flex-row contenedor">
                <div className="col-izquierda flex flex-col w-[45vw] px-[5rem] border-r border-white">
                    <h1 className="text-4xl font-[clash-regular] mt-10">
                        Ponerse en contacto.
                    </h1>
                    <p className="text-lg text-[#696969]">
                        Nos encantaría saber de usted. Nuestro amigable equipo
                        siempre está aquí para charlar.
                    </p>
                    <div className="flex flex-col space-y-10">
                        <div className="flex items-center space-x-2">
                            <div>
                                <h2 className="text-2xl">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="28"
                                        height="28"
                                        color="#696969"
                                        fill="none"
                                        className="absolute left-10 top-50"
                                    >
                                        <path
                                            d="M12.5212 3H11.5192C10.9563 3.00836 10.3958 3.03083 9.84518 3.06737C5.65374 3.34548 2.31504 6.72539 2.04032 10.9686C1.98656 11.7989 1.98656 12.6588 2.04032 13.4892C2.14038 15.0346 2.82509 16.4655 3.63119 17.6738C4.09923 18.5196 3.79035 19.5754 3.30283 20.4975C2.95132 21.1624 2.77557 21.4949 2.91669 21.735C3.0578 21.9752 3.37302 21.9829 4.00346 21.9982C5.25021 22.0285 6.09091 21.6757 6.75825 21.1845C7.13674 20.9059 7.32598 20.7666 7.45641 20.7506C7.58684 20.7346 7.84352 20.8401 8.3568 21.0511C8.81812 21.2408 9.35376 21.3578 9.84518 21.3904C11.2722 21.4851 12.7652 21.4853 14.1951 21.3904C18.2169 21.1236 21.5019 18.0009 22 14"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M15.59 8.64819C14.9612 9.01675 13.3126 9.7693 14.3167 10.711C14.8072 11.171 15.3536 11.5 16.0404 11.5H19.9596C20.6464 11.5 21.1928 11.171 21.6833 10.711C22.6874 9.7693 21.0388 9.01675 20.41 8.64819C18.9355 7.78394 17.0645 7.78394 15.59 8.64819Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <path
                                            d="M20 4C20 5.10457 19.1046 6 18 6C16.8954 6 16 5.10457 16 4C16 2.89543 16.8954 2 18 2C19.1046 2 20 2.89543 20 4Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <path
                                            d="M11.9953 12.5H12.0042M7.99976 12.5H8.00873"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    Chatea con nosotros
                                </h2>
                                <p className="my-3  text-[#696969]">
                                    Nuestro amigable equipo está aquí para
                                    ayudarlo.
                                </p>
                                <a href="#" className="">
                                    hi@consorcify.com
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div>
                                <h2 className="text-2xl ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="28"
                                        height="28"
                                        color="#696969"
                                        fill="none"
                                        className="absolute left-10 top-50"
                                    >
                                        <path
                                            d="M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <path
                                            d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                    </svg>
                                    Oficina
                                </h2>
                                <p className="my-3 text-[#696969]">
                                    Ven a saludar a nuestra oficina central.
                                </p>
                                <address className="not-italic">
                                    100 Smith Street
                                    <br />
                                    Collingwood VIC 3066 AU
                                </address>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div>
                                <h2 className="text-2xl ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="28"
                                        height="28"
                                        color="#696969"
                                        fill="none"
                                        className="absolute left-10 top-50"
                                    >
                                        <path
                                            d="M3.77762 11.9424C2.8296 10.2893 2.37185 8.93948 2.09584 7.57121C1.68762 5.54758 2.62181 3.57081 4.16938 2.30947C4.82345 1.77638 5.57323 1.95852 5.96 2.6524L6.83318 4.21891C7.52529 5.46057 7.87134 6.08139 7.8027 6.73959C7.73407 7.39779 7.26737 7.93386 6.33397 9.00601L3.77762 11.9424ZM3.77762 11.9424C5.69651 15.2883 8.70784 18.3013 12.0576 20.2224M12.0576 20.2224C13.7107 21.1704 15.0605 21.6282 16.4288 21.9042C18.4524 22.3124 20.4292 21.3782 21.6905 19.8306C22.2236 19.1766 22.0415 18.4268 21.3476 18.04L19.7811 17.1668C18.5394 16.4747 17.9186 16.1287 17.2604 16.1973C16.6022 16.2659 16.0661 16.7326 14.994 17.666L12.0576 20.2224Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    Teléfono
                                </h2>
                                <p className="my-3 text-[#696969]">
                                    De lunes a viernes de 8am a 5pm.
                                </p>
                                <a href="#" className="">
                                    +52 (477) 123-543
                                </a>
                            </div>
                        </div>

                        <div>
                            <Link
                                href="/"
                                className="my-3 text-[#696969] text-2xl hover:text-white duration-500 cursor-pointer"
                            >
                                Volver al inicio
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center w-full p-8 space-y-6 text-white rounded-lg imagen">
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

                        <Label htmlFor="password">Password:</Label>
                        <div className="flex items-center justify-between w-full h-10 rounded-md">
                            <Input
                                id="password"
                                name="password"
                                type={lock ? 'password' : 'text'}
                                placeholder="**********"
                                onChange={handleChange}
                                value={userData.password}
                            />

                            <button
                                type="button"
                                className="w-8 ml-2"
                                onClick={handleLock}
                            >
                                {lock ? <EyeIconOff /> : <EyeIcon />}
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
                                Crea tu cuenta aqui
                            </a>
                        </p>
                        <p className="font-light text-center text-[#696969]">
                            ¿Olvidaste tu contraseña?
                            <br />
                            <a href="#" className="text-blue-500">
                                Recupérala aqui
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
