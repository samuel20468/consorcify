// Estilos y componentes
import { Button, Input, Label, Select } from "../ui";

// Hooks
import useAuth from "@/helpers/useAuth";

const FormSupplier = () => {
    useAuth;

    return (
        <div className="w-[80%] flex flex-col justify-center">
            <h1 className="text-center text-3xl mb-4">
                Este es el formulario para agregar un nuevo proveedor
            </h1>
            <form
                autoComplete="off"
                // onSubmit={handleSubmit}
            >
                <div className="flex gap-2">
                    <div className="flex flex-col w-2/4">
                        <Label htmlFor="consortium_id">
                            Consorcio:<span className="text-red-600">*</span>
                        </Label>
                        <Select
                            id="consortium_id"
                            name="consortium_id"
                            // value={supplier.consortium_id}
                            // onChange={handleSelect}
                        >
                            <option value="" disabled selected>
                                Seleccione un consorcio
                            </option>
                            <option value="">Consorcio 1</option>
                            <option value="">Consorcio 2</option>
                            <option value="">Consorcio 3</option>
                            <option value="">Consorcio 4</option>
                            <option value="">Consorcio 5</option>
                            <option value="">Consorcio 6</option>
                        </Select>
                    </div>
                    <div className="flex flex-col w-2/4">
                        <Label htmlFor="name">
                            Nombre del proveedor:
                            <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            // value={supplier.name}
                            type="text"
                            // onChange={handleChange}
                            placeholder="Proveedor Ejemplo SRL"
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="cuit">
                            CUIT:
                            <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="cuit"
                            name="cuit"
                            // value={supplier.cuit}
                            type="number"
                            // onChange={handleChange}
                            placeholder="11-11111111-1"
                        />
                    </div>
                    <div className="flex flex-col w-3/4">
                        <Label htmlFor="email">
                            Email:
                            <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            // value={supplier.email}
                            type="email"
                            // onChange={handleChange}
                            placeholder="provedor@mail.com"
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col w-3/4">
                        <Label htmlFor="address">
                            Dirección:
                            <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="address"
                            name="address"
                            // value={supplier.address}
                            type="text"
                            // onChange={handleChange}
                            placeholder="Calle Falsa 123"
                        />
                    </div>
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="phone_number">
                            Teléfono:
                            <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="phone_number"
                            name="phone_number"
                            // value={supplier.phone_number}
                            type="string"
                            // onChange={handleChange}
                            placeholder="+541144332211"
                        />
                    </div>
                </div>

                <div className="w-full flex justify-center mt-4">
                    <Button className="w-1/4 rounded-[50px] py-2">
                        Guardar gasto
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FormSupplier;
