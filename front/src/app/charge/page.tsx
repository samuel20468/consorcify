"use client";

import Footer from "@/components/Footer/Footer";
import Renter from "@/components/Renter/Renter";
import { ContainerDashboard, Title } from "@/components/ui";
import useAuth from "@/helpers/useAuth";

const Charge = () => {
    useAuth();

    return (
        <div>
            <ContainerDashboard>
                <Title>Cobranzas</Title>
                <Renter />
                <div className="w-full mt-12">
                    <Footer />
                </div>
            </ContainerDashboard>
        </div>
    );
};

export default Charge;
