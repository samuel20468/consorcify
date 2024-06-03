"use client";

import FormRegisterConsortium from "@/components/FormRegisterConsortium/FormRegisterConsortium";
import { ContainerDashboard } from "@/components/ui";
import useAuth from "@/helpers/useAuth";

const AddConsortium = () => {
    useAuth();

    return (
        <div className="flex flex-col h-auto">
            <ContainerDashboard>
                <div className="flex items-center justify-center my-10 rounded-lg h-content bg-slate-200">
                    <FormRegisterConsortium update={true} />
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default AddConsortium;
