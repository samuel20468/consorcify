import { useEffect, useState } from "react";
import useSesion from "./useSesion";
import { getUserById } from "./fetch.helper.user";
import Swal from "sweetalert2";

export const useUfSesion = (): {
    haveUF: boolean;
    isLoading: boolean;
    functional_unit: any[];
} => {
    const { token, data } = useSesion();
    const [haveUF, setHaveUF] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Estado de carga inicialmente true
    const [functional_unit, setFunctional_unit] = useState<any[]>([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getUserById(data.id, token);
                if (response.ok) {
                    const datos = await response.json();
                    if (datos.functional_units.length > 0) {
                        setHaveUF(true);
                        setFunctional_unit(datos.functional_units);
                    } else {
                        setHaveUF(false);
                    }
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "No se pudo obtener la información",
                        icon: "error",
                        confirmButtonText: "Aceptar",
                    });
                }
            } catch (error) {
                console.error(error);
                Swal.fire({
                    title: "Error",
                    text: "Hubo un error al obtener la información",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            } finally {
                setIsLoading(false); // Marcar carga como completada independientemente del resultado
            }
        };

        if (token) {
            getData();
        }
    }, [token]);

    return { haveUF, isLoading, functional_unit };
};
