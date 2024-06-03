"use client";

import { usePathname } from "next/navigation";

export const Mostrar = ({ children }: any) => {
    const pathname = usePathname();

    return (
        <div
            className={
                pathname === "/" ||
                pathname === "/login" ||
                pathname === "/register"
                    ? ""
                    : "hidden"
            }
        >
            {children}
        </div>
    );
};

export default Mostrar;
