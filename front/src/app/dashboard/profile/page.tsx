'use client';

// Estilos y componentes
import { ContainerDashboard, Title } from '@/components/ui';
import Map from '@/components/Map/Map';

// Endpoints
import { getUserById } from '@/helpers/fetch.helper.user';
import { getAdminById } from '@/helpers/fetch.helper.admin';

// Interfaces
import { IUser } from '@/Interfaces/user.interfaces';
import { IAdmin } from '@/Interfaces/admin.interfaces';

// Hooks
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

import useAuth from '@/helpers/useAuth';
import useSesion from '@/helpers/useSesion';
import Image from 'next/image';
import Link from 'next/link';

// ----------------------

const Profile = () => {
    const path = usePathname();
    useAuth();
    const [userData, setUserData] = useState<IUser>();
    const [adminData, setAdminData] = useState<IAdmin>();
    const { token, data } = useSesion();
    const prevTokenRef = useRef<string | null>(null);

    useEffect(() => {
        if (token && token !== prevTokenRef.current) {
            const fetchData = async () => {
                try {
                    if (
                        data.roles?.[0] === 'user' ||
                        data.roles?.[0] === 'superadmin'
                    ) {
                        const response = await getUserById(data.id, token);
                        if (response?.ok) {
                            const data = await response.json();
                            setUserData(data);
                        }
                    } else {
                        const response = await getAdminById(data.id, token);
                        if (response?.ok) {
                            const data = await response.json();
                            setAdminData(data);
                        }
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
        }
        prevTokenRef.current = token;
    }, [token, data]);

    const renderImage = (src: any) => {
        const defaultImage = '/images/default-profile.png';
        return (
            <Image
                src={src || defaultImage}
                alt="Imagen de perfil"
                className="rounded-[40px]"
                width={250}
                height={250}
            />
        );
    };

    return (
        <div className="h-screen">
            <ContainerDashboard>
                <Title>
                    {data.roles?.[0] === 'user' ||
                    data.roles?.[0] === 'superadmin'
                        ? userData?.first_name && userData?.last_name
                        : adminData?.name}
                </Title>
                <div className="flex flex-col items-center gap-4 p-4 mt-5 border rounded-[40px] grad">
                    <div className="flex items-center w-full h-3/5">
                        <div className="w-1/3">
                            {data.roles?.[0] === 'user' ||
                            data.roles?.[0] === 'superadmin'
                                ? renderImage(userData?.picture)
                                : renderImage(adminData?.picture)}
                        </div>
                        <div className="flex flex-col justify-center w-2/3 py-2">
                            {data.roles?.[0] === 'user' ||
                            data.roles?.[0] === 'superadmin' ? (
                                <div className="ml-5">
                                    <h3>NOMBRE: {userData?.first_name}</h3>
                                    <h3>APELLIDO: {userData?.last_name}</h3>
                                    <h3>EMAIL: {userData?.email}</h3>
                                </div>
                            ) : (
                                <div className="ml-5">
                                    <h3>ADMINISTRADOR: {adminData?.name}</h3>
                                    <h3>CUIT: {adminData?.cuit}</h3>
                                    <h3>EMAIL: {adminData?.email}</h3>
                                    <h3>DIRECCIÓN: {adminData?.address}</h3>
                                    <h3>TELÉFONO: {adminData?.phone_number}</h3>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full h-2/5">
                        <Map />
                    </div>
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default Profile;

{
    /* <Link href="/addAvatar" className="w-full">
                                <Button className="w-full py-1 rounded-[40px]">
                                    Cambiar Imagen
                                </Button>
                            </Link> */
}

{
    /* <Link
                                    className="w-full h-full"
                                    href="/dashboard/profile/updateUser"
                                >
                                    <Button className="w-full rounded-[40px] py-2">
                                        Editar Informacion
                                    </Button>
                                </Link> */
}
