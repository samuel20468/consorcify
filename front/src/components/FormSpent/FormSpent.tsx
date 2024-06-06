// Estilos y componentes
import { Button, Input, Label, Select } from "../ui";

// -------------------

const FormSpent = () => {
    return (
        <div className="w-[90%] flex flex-col justify-center">
            <h1>Este es el formulario de gastos</h1>
            <Label>Fecha: "date" (date)</Label>
            <Input />
            <Label>Total: "number" (total_amount)</Label>
            <Input />
            <Label>Estado: "enum" (status)</Label>
            <Input />
            <Label>Categoria: "enum" (category)</Label>
            <Select>
                <option value="" disabled selected>
                    Seleccionar la categoría
                </option>
                <option value="">Categoria 1</option>
                <option value="">Categoria 2</option>
                <option value="">Categoria 3</option>
                <option value="">Categoria 4</option>
            </Select>
            <Label>Numero de factura: "string" (invoice_number)</Label>
            <Input />
            <Label>Descripción: "string" (description)</Label>
            <Input />
            <div className="w-full flex justify-center mt-4">
                <Button className="w-1/4 rounded-[50px] py-2">
                    Guardar gasto
                </Button>
            </div>
        </div>
    );
};

export default FormSpent;
