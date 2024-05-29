interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ children, ...props }: Props) {
    return (
        <button
            className="w-full py-2 pr-3 mt-4 rounded-md shadow-md bg-neutral-50 hover:bg-gray-500 hover:text-white"
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
