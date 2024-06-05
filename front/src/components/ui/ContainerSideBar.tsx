interface Props {
    children: React.ReactNode;
}
export const ContainerSideBar = (props: Props) => {
    const { children } = props;

    return (
        <aside className="fixed flex-col items-center justify-around w-[16%] lg:w-[8%] h-[90%] bg-slate-200 shadow-2xl ml-3 my-10 rounded-xl">
            {children}
        </aside>
    );
};

export default ContainerSideBar;
