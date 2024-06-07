interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ children, ...props }: Props) {
    return (
        <input
            className="w-full h-10 p-2 my-1 text-gray-200 rounded-md shadow-xl bg-input placeholder:font-extralight placeholder:text-gray-500 focus:outline-none no-spinners"
            {...props}
        />
    );
}

export default Input;
