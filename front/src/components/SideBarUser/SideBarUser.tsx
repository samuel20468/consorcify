'use client';

import Link from 'next/link';
import { itemsNavbarUser } from '@/utils/data';
import { ContainerSideBar } from '../ui';
import { usePathname } from 'next/navigation';

const SideBarUser = () => {
    const pathname = usePathname();

    return (
        <ContainerSideBar>
            <nav className="flex flex-col h-full justify-evenly">
                {itemsNavbarUser.map((item) => {
                    const isActive = pathname === item.link;
                    return (
                        <Link
                            href={item.link}
                            key={item.id}
                            className={`flex flex-col items-center text-xs lg:text-base ${
                                isActive ? 'bg-bluee' : ''
                            }`}
                        >
                            <div>{item.icon}</div>
                            <h1>{item.title}</h1>
                        </Link>
                    );
                })}
            </nav>
        </ContainerSideBar>
    );
};

export default SideBarUser;
