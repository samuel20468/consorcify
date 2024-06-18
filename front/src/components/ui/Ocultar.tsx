'use client';

import { usePathname } from 'next/navigation';

export const Ocultar = ({ children }: any) => {
    const pathname = usePathname();

    return (
        <div
            className={
                pathname === '/' ||
                pathname === '/resetPassword' ||
                pathname === '/login' ||
                pathname === '/register'
                    ? 'hidden'
                    : ''
            }
        >
            {children}
        </div>
    );
};

export default Ocultar;
