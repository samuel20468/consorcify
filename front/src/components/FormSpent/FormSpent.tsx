// Estilos y componentes
import { Button, Input, Label, Select } from "../ui";

// Hooks
import useAuth from "@/helpers/useAuth";

// -------------------

const FormSpent = () => {
    useAuth();

    return (
        <div className="w-[80%] flex flex-col justify-center">
            <h1 className="mb-4 text-3xl text-center">
                Este es el formulario de gastos
            </h1>

            <form
                autoComplete="off"
                // onSubmit={handleSubmit}
            >
                <div className="flex gap-2">
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="date">
                            Fecha:<span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="date"
                            name="date"
                            // value={spent.date}
                            type="date"
                            // onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-2/4">
                        <Label htmlFor="consortium_id">
                            Consorcio:<span className="text-red-600">*</span>
                        </Label>
                        <Select
                            id="consortium_id"
                            name="consortium_id"
                            // value={spent.consortium_id}
                            // onChange={handleSelect}
                        >
                            <option value="" disabled selected>
                                Seleccionar el consorcio
                            </option>
                            <option value="">Consorcio 1</option>
                            <option value="">Consorcio 2</option>
                            <option value="">Consorcio 3</option>
                            <option value="">Consorcio 4</option>
                            <option value="">Consorcio 5</option>
                            <option value="">Consorcio 6</option>
                        </Select>
                    </div>
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="total_amount">
                            Total:<span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="total_amount"
                            name="total_amount"
                            // value={spent.total_amount}
                            type="number"
                            // onChange={handleChange}
                            placeholder="$400.000"
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col w-3/4">
                        <Label htmlFor="category">
                            Categoria:<span className="text-red-600">*</span>
                        </Label>
                        <Select
                            id="category"
                            name="category"
                            // value={spent.category}
                            // onChange={handleSelect}
                        >
                            <option value="" disabled selected>
                                Seleccionar la categoría
                            </option>
                            <option value="">Categoria 1</option>
                            <option value="">Categoria 2</option>
                            <option value="">Categoria 3</option>
                            <option value="">Categoria 4</option>
                        </Select>
                    </div>
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="invoice_number">
                            Numero de factura:
                            <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="invoice_number"
                            name="invoice_number"
                            // value={spent.invoice_number}
                            type="number"
                            // onChange={handleChange}
                            placeholder="0000-5678912"
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col w-2/4">
                        <Label htmlFor="supplier_id">
                            Proveedor:<span className="text-red-600">*</span>
                        </Label>
                        <Select
                            id="supplier_id"
                            name="supplier_id"
                            // value={spent.supplier_id}
                            // onChange={handleSelect}
                        >
                            <option value="" disabled selected>
                                Seleccionar el proveedor
                            </option>
                            <option value="">Proveedor 1</option>
                            <option value="">Proveedor 2</option>
                            <option value="">Proveedor 3</option>
                            <option value="">Proveedor 4</option>
                        </Select>
                    </div>
                    <div className="flex flex-col w-2/4">
                        <Label htmlFor="description">
                            Descripción:<span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="description"
                            name="description"
                            // value={spent.description}
                            type="text"
                            // onChange={handleChange}
                            placeholder="Descripción del servicio prestado"
                        />
                    </div>
                </div>
                <div className="flex justify-center w-full mt-4">
                    <Button className="w-1/4 rounded-[50px] py-2">
                        Guardar gastos
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FormSpent;
