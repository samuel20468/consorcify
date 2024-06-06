// Estilos y componentes
import FormSpent from "@/components/FormSpent/FormSpent";
import { ContainerDashboard, Title } from "@/components/ui";

// ------------------

const AddSpent = () => {
    return (
        <div className="h-screen text-black bg-gray-100">
            <ContainerDashboard>
                <Title>Nuevo Gasto</Title>
                <FormSpent />
            </ContainerDashboard>
        </div>
    );
};

export default AddSpent;
