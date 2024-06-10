"use client";

// Estilos y componentes
import { ContainerDashboard, Title } from "@/components/ui";
import FormSupplier from "@/components/FormSupplier/FormSupplier";

// Hooks
import useAuth from "@/helpers/useAuth";

// ------------------

const AddSupplier = () => {
    useAuth();

    return (
        <div className="h-screen text-white">
            <ContainerDashboard>
                <Title>
                    Portal{" "}
                    <span className="text-2xl font-thin">
                        | Proveedores |{" "}
                        <span className="text-xl font-thin">
                            Agregar proveedor
                        </span>
                    </span>
                </Title>
                <FormSupplier />
            </ContainerDashboard>
        </div>
    );
};

export default AddSupplier;
