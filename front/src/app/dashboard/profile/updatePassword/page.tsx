'use client';
import { Button, ContainerDashboard, Input, Label } from '@/components/ui';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/helpers/useAuth';
import useSesion from '@/helpers/useSesion';
import { PiEye, PiEyeClosed } from 'react-icons/pi';
import { validatePwd } from '@/helpers/Validations/validate.password';
import Swal from 'sweetalert2';
import { updatePassFetch } from '@/helpers/fetch.helper.updatePass';

// -------------------------

const UpdatePassword = () => {
    useAuth();
    const { token, data } = useSesion();
    const router = useRouter();
    const initialData = {
        old_password: '',
        password: '',
    };
    const [pass2, setPass2] = useState('');
    const [lock, setLock] = useState<boolean>(true);
    const [errors, SetErrors] = useState(initialData);
    const [passwords, setPasswords] = useState(initialData);
    const role = data.roles;

    useEffect(() => {
        const oldPassErrors = validatePwd(
            'old_password',
            passwords.old_password
        );
        const newPassErrors = validatePwd('password', passwords.password);

        SetErrors((prevErrors) => ({
            ...prevErrors,
            ...oldPassErrors,
            ...newPassErrors,
        }));
    }, [passwords]);
    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswords({
            ...passwords,
            [name]: value,
        });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();

        if (!passwords.password || !passwords.old_password || !pass2) {
            Swal.fire({
                title: 'Error al actualizar contraseña',
                text: 'Asegúrate de completar todos los campos del formulario.',
                icon: 'error',
                confirmButtonColor: '#0b0c0d',
            });
        } else {
            let entity = 'cadmin';
            if (role[0] === 'user' || role[0] === 'superadmin') {
                entity = 'user';
            }
            try {
                const response = await updatePassFetch(
                    passwords,
                    entity,
                    data.id,
                    token
                );
                if (response) {
                    Swal.fire({
                        title: 'Contraseña actualizada',
                        text: 'Has actualizado correctamente tu contraseña',
                        icon: 'success',
                        confirmButtonColor: '#0b0c0d',
                    }).then((res) => {
                        if (res.isConfirmed) {
                            router.push('/dashboard/profile');
                        }
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error al actualizar la contraseña',
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
        <ContainerDashboard className="w-[90%] h-[90vh]">
            <div className="self-start mt-2 text-2xl">
                Actualizar Contraseña
            </div>

            <div className="flex flex-col items-center justify-start my-10 w-full p-8 space-y-6 text-white rounded-lg imagen">
                <form
                    className="w-[30vw] flex flex-col gap-1"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >
                    <div className="flex items-center justify-between w-full">
                        <Label htmlFor="pwd">Contraseña actual:</Label>
                        {errors.old_password && passwords.old_password && (
                            <span className="self-end text-[10px] text-redd ">
                                {errors.old_password}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center justify-between w-full h-10 my-1 rounded-md">
                        <Input
                            id="pwd"
                            name="old_password"
                            type={lock ? 'password' : 'text'}
                            placeholder="**********"
                            onChange={handlerChange}
                            value={passwords.old_password}
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
                        <Label htmlFor="pwd">Nueva Contraseña:</Label>
                        {errors.password && passwords.password && (
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
                            value={passwords.password}
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
                        {passwords.password &&
                            pass2 &&
                            passwords.password !== pass2.trim() && (
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
        </ContainerDashboard>
    );
};

export default UpdatePassword;
