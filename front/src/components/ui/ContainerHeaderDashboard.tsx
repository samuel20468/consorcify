interface Props {
    children: React.ReactNode;
}
export const ContainerHeaderDashboard = (props: Props) => {
    const { children } = props;

    return (
        <nav className="ml-[20%] lg:ml-[10%] h-20 bg-neutral-300 flex justify-center items-center">
            {children}
        </nav>
    );
};

export default ContainerHeaderDashboard;
