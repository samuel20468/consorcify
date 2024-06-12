interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ className, children, ...props }: Props) {
    return (
        <button
            className={`text-black  shadow-md bg-neutral-50 hover:bg-[#8a8a8a] hover:text-white disabled:pointer-events-none ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
