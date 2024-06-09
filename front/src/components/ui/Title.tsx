import { Props } from "@/Interfaces/Interfaces";

export const Title = (props: Props) => {
    const { children, className } = props;

    return (
        <div className={`w-full h-auto p-4 ${className}`}>
            <h1 className="mb-2 text-3xl font-bold">{children}</h1>
            <div className="flex justify-center border-b border-black "></div>
        </div>
    );
};

export default Title;
