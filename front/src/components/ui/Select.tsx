interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export function Select({ children, ...props }: Props) {
    return (
        <select
            className="w-full h-10 px-2 my-1 text-gray-200 rounded-md shadow-xl cursor-pointer bg-input focus:outline-none no-spinners"
            {...props}
        >
            {children}
        </select>
    );
}

export default Select;
