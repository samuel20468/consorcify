'use client';

// Estilos y componentes
import { Button, ContainerDashboard, Input, Label } from '@/components/ui';

// Endpoints
import { getUserById } from '@/helpers/fetch.helper.user';

// Interfaces
import { IRegister, IRegisterError } from '@/Interfaces/user.interfaces';

// Hooks
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useAuth from '@/helpers/useAuth';
import useSesion from '@/helpers/useSesion';

// -------------------------

const UpdateUser = () => {
    useAuth();
    const { token, data } = useSesion();
    const path = usePathname();
    const router = useRouter();

    const initialData = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    };
    const [userData, setUserData] = useState<IRegister>(initialData);
    const [errors, setErrors] = useState<IRegisterError>(initialData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserById(data.id, token);
                if (response?.ok) {
                    const data = await response.json();
                    setUserData(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [token, path, data.id]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleBack = () => {
        setUserData(initialData);
        setErrors(initialData);
        router.push('/dashboard/profile');
    };

    return (
        <ContainerDashboard className="w-[90%] h-[90vh]">
            <div className="self-start mt-2 text-2xl">Modificar Datos</div>
            <div className="flex flex-col items-center justify-center w-full h-full p-8">
                <form
                    onSubmit={handleSubmit}
                    className=" flex flex-col w-1/2 h-[70%] border justify-between rounded-[40px] p-8 gap-3"
                >
                    <div className="flex justify-end w-full">
                        <Button
                            onClick={handleBack}
                            className="py-2 w-24 rounded-[40px]"
                        >
                            Atras
                        </Button>
                    </div>
                    <div>
                        <Label>Nombre:</Label>
                        <Input
                            type="text"
                            name="first_name"
                            value={userData?.first_name}
                            placeholder="Nombre"
                            onChange={handleChange}
                        />

                        <Label>Apellido:</Label>
                        <Input
                            type="text"
                            name="last_name"
                            value={userData?.last_name}
                            placeholder="Nombre"
                            onChange={handleChange}
                        />

                        <Label>Email:</Label>
                        <Input
                            type="text"
                            name="email"
                            value={userData?.email}
                            placeholder="Nombre"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="w-full">
                        <Button className="w-full py-2 rounded-[40px]">
                            Confirmar Cambios
                        </Button>
                    </div>
                </form>
            </div>
        </ContainerDashboard>
    );
};

export default UpdateUser;
