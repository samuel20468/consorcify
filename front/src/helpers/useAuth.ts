import { useEffect } from "react";
import { redirect, usePathname } from "next/navigation";

const useAuth = () => {
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            const user = localStorage.getItem("userData");
            if (!user) {
                redirect("/login");
            }
        }
    }, [pathname]);
};

export default useAuth;
