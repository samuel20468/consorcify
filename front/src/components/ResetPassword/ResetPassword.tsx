'use client';
import { useEffect, useState } from 'react';
import Contact from '../Contact/Contact';
import { Label, Input, Button } from '../ui';
import Link from 'next/link';
import { PiEye, PiEyeClosed } from 'react-icons/pi';
import { validatePwd } from '@/helpers/Validations/validate.password';
import Swal from 'sweetalert2';
import { resetPassFetch } from '@/helpers/fetch.helper.resetPass';
import { useRouter } from 'next/navigation';

export const ResetPassword = () => {
    const router = useRouter();
    const initialData = {
        password: '',
    };
    const [token, setToken] = useState('');
    const [pass2, setPass2] = useState('');
    const [lock, setLock] = useState<boolean>(true);
    const [errors, SetErrors] = useState(initialData);
    const [newPassword, setNewPassword] = useState(initialData);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        if (token) {
            setToken(token);
        }
    }, [token]);

    useEffect(() => {
        const pwdErrors = validatePwd(newPassword.password);

        SetErrors((prevErrors) => ({
            ...prevErrors,
            ...pwdErrors,
        }));
    }, [newPassword]);
    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewPassword({
            ...newPassword,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();

        if (!newPassword.password || !pass2) {
            Swal.fire({
                title: 'Error al iniciar sesión',
                text: 'Asegúrate de completar todos los campos del formulario.',
                icon: 'error',
                confirmButtonColor: '#0b0c0d',
            });
        } else {
            const dataReset = { token, ...newPassword };

            try {
                const response = await resetPassFetch(dataReset);
                if (response) {
                    Swal.fire({
                        title: 'Contraseña resstablecida',
                        text: 'Por favor inicia sesión',
                        icon: 'success',
                        confirmButtonColor: '#0b0c0d',
                    }).then((res) => {
                        if (res.isConfirmed) {
                            router.push('/login');
                        }
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error de información',
                    text: (error as Error).message,
                    icon: 'error',
                    confirmButtonColor: '#0b0c0d',
                });
            }
        }
    };

    const handleLock = () => {
        setLock(!lock);
    };

    const handlePass2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPass2(e.target.value);
    };
    return (
        <>
            <div className="flex flex-col w-screen h-[700px] font-sans lg:flex-row contenedor">
                <Contact />
                <div className="flex flex-col items-center justify-start my-10 w-full p-8 space-y-6 text-white rounded-lg imagen">
                    <div className="flex w-full justify-start">
                        <Link
                            href="/"
                            className="text-[#696969] text-l hover:text-white duration-500 cursor-pointer mb-20"
                        >
                            Volver al inicio
                        </Link>
                    </div>
                    <h1 className="text-3xl font-bold center mr-3">
                        ¡Reestablece tu contraseña!
                    </h1>
                    <form
                        className="w-[30vw] flex flex-col gap-1"
                        onSubmit={handleSubmit}
                        autoComplete="off"
                    >
                        <div className="flex items-center justify-between w-full">
                            <Label htmlFor="pwd">Nueva Contraseña:</Label>
                            {errors.password && newPassword.password && (
                                <span className="self-end text-[10px] text-redd ">
                                    {errors.password}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center justify-between w-full h-10 my-1 rounded-md">
                            <Input
                                id="pwd"
                                name="password"
                                type={lock ? 'password' : 'text'}
                                placeholder="**********"
                                onChange={handlerChange}
                                value={newPassword.password}
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
                                )}{' '}
                            </button>
                        </div>

                        <div className="flex items-center justify-between w-full">
                            <Label htmlFor="pwd2">Repetir Contraseña:</Label>
                            {newPassword.password &&
                                pass2 &&
                                newPassword.password !== pass2.trim() && (
                                    <span className="self-end text-[10px] text-redd ">
                                        Las contraseñas deben coincidir
                                    </span>
                                )}
                        </div>

                        <div className="flex items-center justify-between w-full h-10 my-1 rounded-md ">
                            <Input
                                id="pwd2"
                                name="password2"
                                type={lock ? 'password' : 'text'}
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
                                )}{' '}
                            </button>
                        </div>
                        <Button
                            type="submit"
                            className="w-full py-2 text-black rounded-[50px] shadow-md bg-neutral-50 hover:bg-input hover:text-white disabled:pointer-events-none duration-500 my-10"
                        >
                            Enviar
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
};
