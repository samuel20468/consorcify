interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({children,...props}: Props) {
    return (
        <div className="flex items-center w-full">
            <input
                className="w-full h-10 p-2 my-1 text-gray-200 border-none rounded-md shadow-xl bg-input placeholder:font-extralight placeholder:text-gray-500 focus:outline-none"
                {...props}
            />
            {children && <div className="ml-2">{children}</div>}
        </div>
    );
}

export default Input;
