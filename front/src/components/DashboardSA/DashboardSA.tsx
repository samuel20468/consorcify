// Estilos y componentes
import { Button, ContainerDashboard, Title } from '../ui';
import { BsBuildingFillAdd } from 'react-icons/bs';
import { IoMdPersonAdd } from 'react-icons/io';

// Interfaces
import { IUser } from '@/Interfaces/user.interfaces';

// Endpoints
import { getUserById } from '@/helpers/fetch.helper.user';

// Hooks
import { useEffect, useState } from 'react';
import useSesion from '@/helpers/useSesion';
import Link from 'next/link';
import useAuth from '@/helpers/useAuth';

// ----------------------

const DashboardSA = () => {
    useAuth();
    const { token, data } = useSesion();
    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        const fecthData = async () => {
            try {
                const response = await getUserById(data.id, token);
                if (response) {
                    const data = await response.json();
                    setUser(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fecthData();
        }
    }, [token, data]);

    return (
        <div className="h-screen text-white">
            <ContainerDashboard>
                <Title>
                    Administración general - {user?.first_name}{' '}
                    {user?.last_name}
                </Title>
                <div className="flex justify-center w-[98%] gap-10 p-4 pt-[10%]">
                    <Link
                        href="/addAdministrator"
                        className="flex flex-col items-center justify-center text-3xl text-white border rounded-[40px] pb-2 gradiente shadow-[0_3px_10px_rgb(255,255,255,0.8)]"
                    >
                        <IoMdPersonAdd size={100} />
                        <h3 className="mt-4 mb-1 text-2xl font-bold">
                            Crear un administrador{' '}
                        </h3>
                        <p className="w-2/3 text-base text-center ">
                            Agrega un administrador para gestionar operaciones y
                            servicios.
                        </p>
                    </Link>
                    <Link
                        href="/addConsortium"
                        className="flex flex-col items-center justify-center text-3xl text-white border rounded-[40px] pb-2 gradiente shadow-[0_3px_10px_rgb(255,255,255,0.8)]"
                    >
                        <BsBuildingFillAdd size={100} />
                        <h3 className="mt-4 mb-1 text-2xl font-bold">
                            Crear un consorcio
                        </h3>
                        <p className="w-2/3 text-base text-center ">
                            Inicia un nuevo consorcio con gestión eficiente y
                            transparente.
                        </p>
                    </Link>
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default DashboardSA;
