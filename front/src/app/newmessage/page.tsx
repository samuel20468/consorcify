'use client';
import { IFunctionalUnits } from '@/Interfaces/functionalUnits.interfaces';
import { INewMessage } from '@/Interfaces/messages.interfaces';
import {
    Button,
    ContainerDashboard,
    Input,
    Label,
    Select,
    Title,
} from '@/components/ui';
import { areFieldsNotEmpty } from '@/helpers/Validations/validate.empty';
import { getUserById } from '@/helpers/fetch.helper.user';
import { newMessage } from '@/helpers/fetch.messages.user';
import useAuth from '@/helpers/useAuth';
import useSesion from '@/helpers/useSesion';
import { log } from 'console';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const News: React.FC = () => {
    useAuth();
    const { token, data } = useSesion();
    const initialData: INewMessage = {
        user_id: data.id,
        functional_unit_id: '',
        subject: '',
        content: '',
    };
    const router = useRouter();
    const [dataMessage, setDataMessage] = useState<INewMessage>(initialData);
    const [functionalUnit, setFunctionalUnit] = useState<IFunctionalUnits[]>(
        []
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!areFieldsNotEmpty(dataMessage)) {
            Swal.fire({
                title: 'mensaje vacio',
                text: 'Por favor ingrese un mensaje',
            });
            return;
        }

        try {
            const response = await newMessage(token, dataMessage);
            if (response) {
                Swal.fire({
                    title: 'mensaje enviado',
                    text: 'Su mensaje fue enviado correctamente',
                });
                setDataMessage(initialData);
                router.push('/dashboard/usuario/news');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fecthData = async () => {
            try {
                const response = await getUserById(data.id, token);
                if (response) {
                    const datos = await response.json();
                    setFunctionalUnit(datos.functional_units);
                }
            } catch (error) {}
        };

        if (data) {
            fecthData();
            setDataMessage((prevData) => ({
                ...prevData,
                user_id: data.id,
            }));
        }
    }, [data]);

    const handleChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setDataMessage((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    console.log(dataMessage);

    return (
        <ContainerDashboard className="w-[90%] h-[90vh] flex gap-2 items-center ">
            <Title>
                <p className="text-2xl">Nuevo Mensaje</p>
            </Title>
            <div className="w-full h-full flex items-center justify-center">
                <form
                    className=" flex flex-col  w-[60%] p-8 border rounded-[40px] justify-center items-center"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-2 w-1/2">
                        <Label>Unidad Funcional</Label>
                        <Select
                            name="functional_unit_id"
                            value={dataMessage.functional_unit_id}
                            onChange={handleChange}
                        >
                            <option value="">
                                Seleccione la unidad funcional
                            </option>
                            {functionalUnit &&
                                functionalUnit.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.location}
                                    </option>
                                ))}
                        </Select>

                        <Label>Asunto</Label>
                        <Select
                            name="subject"
                            value={dataMessage.subject}
                            onChange={handleChange}
                        >
                            <option value="">Seleccione el Asunto</option>
                            <option value="Reclamo">Reclamo</option>
                            <option value="Consulta">Consulta</option>
                            <option value="Sugerencia">Sugerencia</option>
                            <option value="Solicitud de Mantenimiento">
                                Solicitud de Mantenimiento
                            </option>
                        </Select>
                        <Label>Mensaje</Label>
                        <textarea
                            className="flex w-full p-2 my-1 text-gray-200 rounded-md shadow-xl bg-input placeholder:font-extralight placeholder:text-gray-500 focus:outline-none h-[200px]"
                            value={dataMessage.content}
                            name="content"
                            placeholder="Escribe aquí tu mensaje"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center justify-end w-full">
                        <Button className="w-32 py-2 rounded-[40px]">
                            Enviar Mensaje
                        </Button>
                    </div>
                </form>
            </div>
        </ContainerDashboard>
    );
};
export default News;
