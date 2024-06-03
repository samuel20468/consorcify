import { Props } from "@/Interfaces/Interfaces";

export const Title = (props: Props) => {
    const { children } = props;

    return (
        <div className="w-full h-auto p-4">
            <h1 className="mb-2 text-3xl font-bold">{children}</h1>
            <div className=" border-b flex justify-center"></div>
        </div>
    );
};

export default Title;
