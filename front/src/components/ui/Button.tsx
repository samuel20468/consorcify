interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ className, children, ...props }: Props) {
    return (
        <button
            className={`text-black duration-500 shadow-md bg-neutral-50 hover:bg-input hover:text-white disabled:pointer-events-none ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
