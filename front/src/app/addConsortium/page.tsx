"use client";

import FormRegisterConsortium from "@/components/FormRegisterConsortium/FormRegisterConsortium";
import { ContainerDashboard } from "@/components/ui";
import useAuth from "@/helpers/useAuth";

const AddConsortium = () => {
    useAuth();

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <ContainerDashboard>
                <div className="flex items-center justify-center my-10 bg-gray-200 rounded-lg h-content">
                    <FormRegisterConsortium />
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default AddConsortium;
