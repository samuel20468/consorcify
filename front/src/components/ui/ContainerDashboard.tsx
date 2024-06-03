import { Props } from "@/Interfaces/Interfaces";

export const ContainerDashboard = (props: Props) => {
    const { children, className } = props;

    return (
        <div
            className={`flex flex-col justify-center items-center ${className}`}
        >
            {children}
        </div>
    );
};

export default ContainerDashboard;
