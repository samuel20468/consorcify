import { IUserData } from "@/Interfaces/user.interfaces";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useSesion = (): { token: string; data: IUserData } => {
    const [token, setToken] = useState<string>("");
    const [data, setData] = useState<IUserData>({
        email: "",
        exp: 0,
        iat: 0,
        id: "",
        roles: [],
    });
    const path = usePathname();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("userData")!);
        if (data) {
            setToken(data.token);
            setData(data.user);
        }
    }, [path, token]);

    return { token, data };
};

export default useSesion;
