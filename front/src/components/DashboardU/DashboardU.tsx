import { AccountBalance } from "@/helpers/icons.helper";
import { Button, ContainerDashboard } from "../ui";

const DashboardU = () => {
    return (
        <ContainerDashboard className="w-[90%] h-[90vh] justify-center p-5">
            <div className="flex items-center justify-center w-full gap-2 mt-2 h-1/3">
                <div className="flex items-center justify-center  w-full h-full border rounded-[40px] bg-gradient-to-r from-neutral-50 via-fondo to-fondo">
                    <div className="flex items-center justify-center w-full">
                        <AccountBalance className="w-10 text-black" />
                    </div>
                    <div className="flex flex-col items-center justify-center w-full h-full text-xl">
                        <p className="flex items-center justify-center w-full h-1/4">
                            Saldo
                        </p>
                        <p className="flex items-center justify-center w-full h-1/4">
                            Acá va el saldo del inquilino
                        </p>
                    </div>
                </div>
                <div className=" w-full h-full border rounded-[40px] "></div>
            </div>
            <div className="flex justify-center   rounded-[40px] mt-2 w-full h-1/3 items-center">
                <div className="flex border rounded-[40px] w-3/4 h-1/3 items-center justify-between p-5">
                    <Button className=" w-32 rounded-[40px] py-2">Pagar</Button>
                    <Button className=" w-32 rounded-[40px] py-2">
                        Expensas
                    </Button>
                    <Button className=" w-32 rounded-[40px] py-2">
                        Amenities
                    </Button>
                </div>
            </div>
            <div className="flex items-center justify-center w-full gap-2 mt-2 h-1/3">
                <div className="flex flex-col p-5 w-full h-full justify-around gap-2 border rounded-[40px]">
                    <div className="flex items-center justify-center rounded-[40px] w-full h-16 text-black bg-neutral-50">
                        Mora Total Unidades
                    </div>
                    <div className="flex items-center justify-center h-full border rounded-[40px]">
                        Acá va la información pertinente
                    </div>
                </div>
                <div className="flex flex-col p-5 w-full h-full justify-around gap-2 border rounded-[40px]">
                    <div className="flex items-center justify-center rounded-[40px] w-full h-16 text-black bg-neutral-50">
                        Dinero en Cuenta
                    </div>
                    <div className="flex items-center justify-center h-full border rounded-[40px]">
                        Acá va la información pertinente
                    </div>
                </div>
                <div className="flex flex-col p-5 w-full h-full justify-around gap-2 border rounded-[40px]">
                    <div className="flex items-center justify-center rounded-[40px] w-full h-16 text-black bg-neutral-50">
                        Gastos Expensas
                    </div>
                    <div className="flex items-center justify-center h-full border rounded-[40px]">
                        Acá va la información pertinente
                    </div>
                </div>
                <div className="flex flex-col p-5 w-full h-full justify-around gap-2 border rounded-[40px]">
                    <div className="flex items-center justify-center rounded-[40px] w-full h-16 text-black bg-neutral-50">
                        C/C Consorcio
                    </div>
                    <div className="flex items-center justify-center h-full border rounded-[40px]">
                        Acá va la información pertinente
                    </div>
                </div>
            </div>
        </ContainerDashboard>
    );
};

export default DashboardU;
