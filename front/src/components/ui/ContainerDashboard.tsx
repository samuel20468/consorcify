interface Props {
    children: React.ReactNode;
}
export const ContainerDashboard = (props: Props) => {
    const { children } = props;

    return (
        <div className="ml-[20%] lg:ml-[10%] flex flex-col justify-center items-center">
            {children}
        </div>
    );
};

export default ContainerDashboard;
