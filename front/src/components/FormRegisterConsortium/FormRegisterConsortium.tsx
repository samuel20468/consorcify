import { Button, Input, Label } from "../ui";

const FormRegisterConsortium = () => {
    return (
        <div className="w-full h-auto p-4">
            <h1 className="mb-2 text-lg font-bold">
                Consorcios{" "}
                <span className="text-sm font-normal">
                    | Registro de nuevo consorcio
                </span>
            </h1>
            <form className="mx-10 my-5">
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col lg:w-1/4">
                        <Label>Clave SUTERH:</Label>
                        <Input />
                    </div>
                    <div className="flex flex-col lg:w-1/2">
                        <Label>Razon Social:</Label>
                        <Input />
                    </div>
                    <div className="flex flex-col lg:w-1/4">
                        <Label>CUIT:</Label>
                        <Input />
                    </div>
                </div>

                <div className="flex flex-row gap-4 ">
                    <div className="flex flex-col lg:w-3/4">
                        <Label>Dirección:</Label>
                        <Input />
                    </div>
                    <div className="flex flex-col lg:w-1/4">
                        <Label>Altura:</Label>
                        <Input />
                    </div>
                </div>

                <div className="flex flex-row gap-4">
                    <div className="flex flex-col lg:w-1/4">
                        <Label>País:</Label>
                        <Input />
                    </div>
                    <div className="flex flex-col lg:w-1/4">
                        <Label>Provincia:</Label>
                        <Input />
                    </div>
                    <div className="flex flex-col lg:w-1/4">
                        <Label>Ciudad:</Label>
                        <Input />
                    </div>
                    <div className="flex flex-col lg:w-1/4">
                        <Label>Código postal</Label>
                        <Input />
                    </div>
                </div>

                <div className="flex flex-row gap-4">
                    <div className="flex flex-col lg:w-1/4">
                        <Label>Cantidad de pisos:</Label>
                        <Input />
                    </div>
                    <div className="flex flex-col lg:w-1/4">
                        <Label>Cantidad UF's:</Label>
                        <Input />
                    </div>
                    <div className="flex flex-col lg:w-1/4">
                        <Label>Categoría edificio </Label>
                        <Input />
                    </div>
                    <div className="flex flex-col lg:w-1/4">
                        <Label>Primer vencimiento</Label>
                        <Input />
                    </div>
                </div>
                <div className="mt-4">
                    <Button>Crear Consorcio</Button>
                </div>
            </form>
        </div>
    );
};

export default FormRegisterConsortium;
