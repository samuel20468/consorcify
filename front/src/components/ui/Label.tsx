interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ children, ...props }: Props) {
    return (
        <label className="pl-2 mt-1" {...props}>
            {children}
        </label>
    );
}

export default Label;
