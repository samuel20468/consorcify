import { ContainerDashboard } from "@/components/ui";
import React from "react";

const Profile = () => {
    return (
        <ContainerDashboard className="w-[90%] h-[90vh]">
            <div className="flex  w-[90%] h-full m-3 bg-slate-50 p-10 gap-10 rounded-[40px]">
                <div className="flex flex-col rounded-[40px] w-1/2 p-2 gap-2 h-full bg-gray-400">
                    <div className="w-full h-1/2 bg-white rounded-[40px]"></div>
                    <div className="w-full h-1/2 bg-white rounded-[40px]"></div>
                </div>
                <div className="flex flex-col gap-2 rounded-[40px] w-1/2 h-full bg-gray-400 p-2">
                    <div className="w-full h-1/3 border rounded-[40px]"></div>
                    <div className="w-full h-2/3 border rounded-[40px]"></div>
                </div>
            </div>
        </ContainerDashboard>
    );
};

export default Profile;
