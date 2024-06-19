'use client';

// Estilos y componentes
import { Button, ContainerHeaderDashboard } from '../ui';
import RoleIcon from '../Navbar/RoleIcon/roleIcon';

// Interfaces
import { IUser } from '@/Interfaces/user.interfaces';
import { IAdmin } from '@/Interfaces/admin.interfaces';

// Endpoints
import { getUserById } from '@/helpers/fetch.helper.user';
import { getAdminById } from '@/helpers/fetch.helper.admin';

// Hooks
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import useSesion from '@/helpers/useSesion';
import { IoMdArrowRoundBack } from 'react-icons/io';
// ----------------------------

const NavbarDashboard = () => {
    const router = useRouter();
    const path = usePathname();
    const { token, data } = useSesion();
    const [user, setUser] = useState<IUser>();
    const [admin, setAdmin] = useState<IAdmin>();

    useEffect(() => {
        const fetchData = async () => {
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
        if (data.roles?.[0] === 'user' || data.roles?.[0] === 'superadmin') {
            fetchData();
        }
    }, [token, data.id, data.roles]);

    useEffect(() => {
        const fecthData = async () => {
            try {
                const response = await getAdminById(data.id, token);
                if (response) {
                    const data = await response.json();
                    setAdmin(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (data.roles?.[0] === 'cadmin') {
            fecthData();
        }
    }, [token, data.id, data.roles]);

    const handleLogout = () => {
        localStorage.removeItem('userData');
        router.push('/');
    };

    const handleReturn = () => {
        router.push('/dashboard');
    };

    const handleGoBack = () => {
        if (path !== '/') {
            router.back();
        } else {
            router.push('/');
        }
    };

    return (
        <ContainerHeaderDashboard className="w-[90%] p-8">
            <div className="flex items-center justify-start w-1/3">
                <div>
                    {path !== '/dashboard' && (
                        <div>
                            <Button
                                onClick={handleReturn}
                                className="w-32 mr-3 py-2 rounded-[40px]"
                            >
                                Inicio
                            </Button>
                            <Button
                                onClick={handleGoBack}
                                className="w-32 py-2 rounded-[40px]"
                            >
                                Volver
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-center w-1/3">
                <h2 className="text-3xl">CONSORCIFY</h2>
            </div>
            <div className="flex items-center justify-end w-1/3">
                <div className="flex gap-2">
                    <Link
                        className=" w-48 h-full rounded-[40px]"
                        href="/dashboard/profile"
                    >
                        <Button className="flex items-center justify-evenly p-1 w-full py-2 rounded-[40px]">
                            {data?.roles?.[0] === 'superadmin' ||
                            data?.roles?.[0] === 'user'
                                ? user?.first_name! + ' ' + user?.last_name!
                                : admin?.name!}
                            {data.roles && <RoleIcon role={data.roles[0]} />}
                        </Button>
                    </Link>
                    <Button
                        onClick={handleLogout}
                        className="w-32 py-2 rounded-[40px]"
                    >
                        Cerrar sesión
                    </Button>
                </div>
            </div>
        </ContainerHeaderDashboard>
    );
};

export default NavbarDashboard;
