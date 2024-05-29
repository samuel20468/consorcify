import { Button, Input, Label } from "@/components/ui";

export default function Home() {
    return (
        <main className="flex flex-col items-center min-h-screen gap-3 p-24 ">
            <h1>Formulario prueba</h1>
            <div className="flex flex-row w-full max-w-xl gap-2">
                <div>
                    <Label>Nombre:</Label>
                    <Input type="text" placeholder="Nombre" />
                </div>
                <div>
                    <Label>Apellido:</Label>
                    <Input type="text" placeholder="Apellido" />
                </div>
            </div>
            <div className="w-full max-w-xl pr-3">
                <Label>Email:</Label>
                <Input type="mail" placeholder="Email" />
            </div>
            <div className="w-full max-w-xl pr-3">
                <Button>Registrar</Button>
            </div>
        </main>
    );
}
