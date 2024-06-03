import Link from "next/link";
import Footer from "../Footer/Footer";
import { ContainerDashboard, Title } from "../ui";

const DashboardA = () => {
    return (
        <ContainerDashboard>
            <Title>Mi Administración</Title>
            <div className="grid w-full h-auto grid-cols-1 gap-10 p-4 my-24 text-black md:grid-cols-2 lg:grid-cols-3">
                <Link
                    href="/addConsortium"
                    className="flex justify-center items-end text-2xl bg-gray-100 hover:bg-gray-200 h-72 rounded-[50px] pb-2"
                >
                    Agregar consorcio
                </Link>
                <Link
                    href="#"
                    className="flex justify-center items-end text-2xl bg-gray-100 hover:bg-gray-200 h-72 rounded-[50px] pb-2"
                >
                    Opcion 2
                </Link>
                <Link
                    href="#"
                    className="flex justify-center items-end text-2xl bg-gray-100 hover:bg-gray-200 h-72 rounded-[50px] pb-2"
                >
                    Opcion 3
                </Link>
            </div>
            <div className="w-full">
                <Footer />
            </div>
        </ContainerDashboard>
    );
};

export default DashboardA;
