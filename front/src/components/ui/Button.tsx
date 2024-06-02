interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ children, ...props }: Props) {
    return (
        <button
            className="w-full py-2 text-black rounded-md shadow-md bg-neutral-50 hover:bg-gray-500 hover:text-white disabled:pointer-events-none"
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
