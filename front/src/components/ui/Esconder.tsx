"use client";

import { usePathname } from "next/navigation";

const Esconder = ({ children }: any) => {
    const pathname = usePathname();

    return (
        <div
            className={
                pathname !== "/" || "/login" || "/register" ? "hidden" : ""
            }
        >
            {children}
        </div>
    );
};

export default Esconder;
