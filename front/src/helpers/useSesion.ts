import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const useSesion = () => {
    const [token, setToken] = useState<string>("");
    const path = usePathname();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("userData")!);
        if (data) {
            setToken(data.token);
        }
    }, [path]);

    return token;
};

export default useSesion;
