"use client";
import FormAddFuncionalUnit from "@/components/FormAddFuncionalUnit/page";
import { ContainerDashboard, Title } from "@/components/ui";
import { useParams } from "next/navigation";

const AddFuncionalUnits = () => {
    const { id }: { id: string } = useParams();
    return (
        <ContainerDashboard className="w-[90%] h-[90vh]">
            <Title>Agregar Unidad Funcional</Title>
            <FormAddFuncionalUnit consortium_id={id} />
        </ContainerDashboard>
    );
};

export default AddFuncionalUnits;
