"use client";

import FormRegisterSuperAdmin from "@/components/formRegisterSuperAdmin/FormRegisterSuperAdmin";
import { ContainerDashboard } from "@/components/ui";
import useAuth from "@/helpers/useAuth";

const AddConsortium = () => {
    useAuth();

    return (
        <div className="flex flex-col h-auto">
            <ContainerDashboard>
                <div className="flex items-center justify-center w-1/2 my-10 rounded-lg h-content bg-slate-200">
                    <FormRegisterSuperAdmin update={true} />
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default AddConsortium;
