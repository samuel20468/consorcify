interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: Props) {
    return (
        <input
            className="w-full h-10 p-2 my-1 text-gray-200 border border-gray-800 rounded-md shadow-xl bg-input placeholder:font-extralight placeholder:text-gray-500"
            {...props}
        />
    );
}

export default Input;
