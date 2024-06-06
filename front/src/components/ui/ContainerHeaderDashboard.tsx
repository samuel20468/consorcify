interface Props {
    children: React.ReactNode;
    className?: string;
}
export const ContainerHeaderDashboard = (props: Props) => {
    const { children, className } = props;

    return (
        <nav
            className={`ml-[20%] lg:ml-[10%] h-20 flex items-center border-b-2 ${className}`}
        >
            {children}
        </nav>
    );
};

export default ContainerHeaderDashboard;
