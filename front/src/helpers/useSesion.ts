import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useSesion = () => {
    const [token, setToken] = useState<string>("");
    const [data, setData] = useState<string>("");
    const path = usePathname();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("userData")!);
        if (data) {
            setToken(data.token);
            setData(data.user.id);
        }
    }, [path, token]);

    return { token, data };
};

export default useSesion;
