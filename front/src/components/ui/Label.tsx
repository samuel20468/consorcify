interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ children, ...props }: Props) {
    return (
        <label className="pl-2 mt-2" {...props}>
            {children}
        </label>
    );
}

export default Label;
