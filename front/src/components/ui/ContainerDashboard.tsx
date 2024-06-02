import { Props } from "@/Interfaces/Interfaces";

export const ContainerDashboard = (props: Props) => {
    const { children, className } = props;

    return (
        <div
            className={`ml-[20%] lg:ml-[10%] flex flex-col justify-center items-center ${className}`}
        >
            {children}
        </div>
    );
};

export default ContainerDashboard;
