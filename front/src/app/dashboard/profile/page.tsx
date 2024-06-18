'use client';

// Estilos y componentes
import { Button, ContainerDashboard, Title } from '@/components/ui';

// Endpoints
import { getUserById } from '@/helpers/fetch.helper.user';
import { getAdminById } from '@/helpers/fetch.helper.admin';

// Interfaces
import { IUser } from '@/Interfaces/user.interfaces';
import { IAdmin } from '@/Interfaces/admin.interfaces';

// Hooks
import { useEffect, useRef, useState } from 'react';
import useAuth from '@/helpers/useAuth';
import useSesion from '@/helpers/useSesion';
import Image from 'next/image';
import Link from 'next/link';

// ----------------------

const Profile = () => {
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
        const defaultImage =
            'https://res.cloudinary.com/consorcify/image/upload/v1717986798/xhieldioaw4r59gfxqmp.jpg';
        return (
            <Image
                src={src || defaultImage}
                alt="Imagen de perfil"
                className="rounded-[40px] shadow-xl shadow-blackk"
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
                <div className="flex justify-center items-center gap-4 p-4 mt-5 h-[300px] w-[700px] rounded-[40px] text-neutral-50 bg-bluee">
                    <div className="w-1/3 mx-10">
                        {data.roles?.[0] === 'user' ||
                        data.roles?.[0] === 'superadmin'
                            ? renderImage(userData?.picture)
                            : renderImage(adminData?.picture)}
                    </div>
                    <div className="flex flex-col justify-center w-2/3">
                        {data.roles?.[0] === 'user' ||
                        data.roles?.[0] === 'superadmin' ? (
                            <div>
                                <h3 className="mb-2">
                                    NOMBRE: {userData?.first_name}
                                </h3>
                                <h3 className="mb-2">
                                    APELLIDO: {userData?.last_name}
                                </h3>
                                <h3 className="mb-2">
                                    EMAIL: {userData?.email}
                                </h3>
                            </div>
                        ) : (
                            <div>
                                <h3>ADMINISTRADOR: {adminData?.name}</h3>
                                <h3>CUIT: {adminData?.cuit}</h3>
                                <h3>EMAIL: {adminData?.email}</h3>
                                <h3>DIRECCIÓN: {adminData?.address}</h3>
                                <h3>TELÉFONO: {adminData?.phone_number}</h3>
                            </div>
                        )}
                    </div>
                </div>
                {data.roles?.[0] === 'user' ||
                data.roles?.[0] === 'superadmin' ? (
                    <div className="flex justify-evenly w-[70%] my-5 gap-2">
                        <Link href="/addAvatar">
                            <Button className="w-44 py-2 rounded-[40px]">
                                Cambiar Imagen
                            </Button>
                        </Link>
                        <Link href="/dashboard/profile/updateUser">
                            <Button className="w-44 py-2 rounded-[40px]">
                                Editar Informacion
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="flex justify-evenly w-[70%] my-5 gap-2">
                        <Link href="/addAvatar">
                            <Button className="w-44 py-2 rounded-[40px]">
                                Cambiar Imagen
                            </Button>
                        </Link>
                        <Link href={`/updateAdministrator/${adminData?.id}`}>
                            <Button className="w-44 py-2 rounded-[40px]">
                                Editar Información
                            </Button>
                        </Link>
                    </div>
                )}
            </ContainerDashboard>
        </div>
    );
};

export default Profile;
