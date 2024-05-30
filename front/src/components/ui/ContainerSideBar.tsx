interface Props {
    children: React.ReactNode;
}
const ContainerSideBar = (props: Props) => {
    const { children } = props;

    return (
        <aside className="fixed flex flex-col items-center justify-around w-[20%] lg:w-[10%] h-full bg-slate-200">
            {children}
        </aside>
    );
};

export default ContainerSideBar;
