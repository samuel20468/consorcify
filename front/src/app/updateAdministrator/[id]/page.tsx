'use client';

// Estilos y componentes
import { ContainerDashboard, Title } from '@/components/ui';
import FormRegisterAdmin from '@/components/FormRegisterAdministrador/FormRegisterAdmin';

// Hooks
import useAuth from '@/helpers/useAuth';

const AddConsortium = () => {
    useAuth();

    return (
        <div className="flex flex-col h-auto text-[#e5e7eb]">
            <ContainerDashboard>
                <Title>Modificar administrador</Title>
                <div className="flex items-center justify-center w-1/2 my-10 rounded-lg h-content bg-slate-200">
                    <FormRegisterAdmin update={true} />
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default AddConsortium;
