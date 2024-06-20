'use client';

// Estilos y componentes
import { Button, Input, Label, Select } from '../ui';
import Swal from 'sweetalert2';

// Validaciones
import { validateSuterh } from '@/helpers/Validations/validate.suterh';
import { validateCuit } from '@/helpers/Validations/validate.cuit';

// Endpoints
import { IUserData } from '@/Interfaces/user.interfaces';
import { getAdmins } from '@/helpers/fetch.helper.admin';
import {
    consortiumFetch,
    getConsortiumById,
    updateConsortium,
} from '@/helpers/fetch.helper.consortium';

// Iterfaces
import { IAdmin } from '@/Interfaces/admin.interfaces';
import {
    INewConsortium,
    INewConsortiumError,
} from '@/Interfaces/consortium.interfaces';

// Hooks
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import useAuth from '@/helpers/useAuth';
import useSesion from '@/helpers/useSesion';
import path from 'path';
import { validateNumbers } from '@/helpers/Validations/validate.numbers';

// -----------------

const FormRegisterConsortium = ({ update = false }) => {
    const initialData = {
        suterh_key: '',
        name: '',
        cuit: '',
        street_name: '',
        building_number: 0,
        zip_code: '',
        country: '',
        province: '',
        city: '',
        floors: 0,
        ufs: 0,
        category: 0,
        first_due_day: 0,
        interest_rate: 0,
        c_admin: '' || ({ id: '' } as IAdmin),
    };
    const initialDataError = {
        cuit: '',
        first_due_day: '',
        interest_rate: '',
    };
    useAuth();
    const { token, data }: { token: string; data: IUserData } = useSesion();
    const router = useRouter();
    const params: { id: string } = useParams();

    const [admins, setAdmins] = useState<IAdmin[]>();
    const [consortiumRegister, setConsortiumRegister] =
        useState<INewConsortium>(initialData);
    const [consortiumRegisterError, setConsortiumRegisterError] =
        useState<INewConsortiumError>(initialDataError);

    useEffect(() => {
        const fetchConsortium = async () => {
            if (update) {
                try {
                    const response = await getConsortiumById(params.id, token);
                    const data = await response?.json();
                    if (
                        data.c_admin !== null &&
                        typeof data.c_admin === 'object'
                    ) {
                        setConsortiumRegister((prevState) => ({
                            ...prevState,
                            c_admin: data.c_admin.id,
                        }));
                    }
                    setConsortiumRegister(data);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        const fetchData = async () => {
            try {
                const response = await getAdmins(token);
                if (response) {
                    const data = await response.json();
                    setAdmins(data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (token) {
            fetchData();
            if (update) {
                fetchConsortium();
            }
        }
    }, [token, params.id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let parsedValue: string | number = value;

        if (name === 'interest_rate') {
            parsedValue = value === '' ? '' : parseFloat(value);
        } else if (
            name === 'building_number' ||
            name === 'floors' ||
            name === 'ufs' ||
            name === 'category' ||
            name === 'first_due_day' ||
            name === 'interest_rate'
        ) {
            parsedValue = value === '' ? 0 : parseInt(value, 10);
        }

        setConsortiumRegister({
            ...consortiumRegister,
            [name]: parsedValue,
        });
    };

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;

        setConsortiumRegister({
            ...consortiumRegister,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            !consortiumRegister.building_number ||
            !consortiumRegister.category ||
            !consortiumRegister.city ||
            !consortiumRegister.country ||
            !consortiumRegister.cuit ||
            !consortiumRegister.first_due_day ||
            !consortiumRegister.floors ||
            !consortiumRegister.name ||
            !consortiumRegister.province ||
            !consortiumRegister.street_name ||
            !consortiumRegister.ufs ||
            !consortiumRegister.zip_code ||
            (consortiumRegister.interest_rate !== 0 &&
                !consortiumRegister.interest_rate)
        ) {
            Swal.fire({
                title: 'Formulario incompleto',
                text: 'Asegúrate de completar todos los campos del formulario.',
                icon: 'error',
                confirmButtonColor: '#0b0c0d',
            });
            return;
        }

        const consortiumData = {
            ...consortiumRegister,
            c_admin:
                typeof consortiumRegister.c_admin === 'object'
                    ? consortiumRegister.c_admin.id
                    : consortiumRegister.c_admin,
        };

        if (update) {
            try {
                const response = await updateConsortium(
                    params.id,
                    token,
                    consortiumData
                );
                if (response?.ok) {
                    Swal.fire({
                        title: 'Excelente',
                        text: `El consorcio ${consortiumData.name} se modificó correctamente`,
                        icon: 'success',
                        confirmButtonColor: '#0b0c0d',
                    }).then((res) => {
                        if (res.isConfirmed) {
                            if (data?.roles?.[0] == 'superadmin') {
                                router.push(
                                    `/dashboard/superadmin/consorcios/All/${params.id}`
                                );
                            } else {
                                router.push(
                                    `/dashboard/admin/consortiums/${params.id}`
                                );
                            }
                        }
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error de información',
                    text: (error as Error).message,
                    icon: 'error',
                    confirmButtonColor: '#0b0c0d',
                });
            }
        } else {
            try {
                const response = await consortiumFetch(consortiumData, token);
                if (response?.ok) {
                    Swal.fire({
                        title: 'Excelente',
                        text: `El consorcio ${consortiumData.name} se creó correctamente`,
                        icon: 'success',
                        confirmButtonColor: '#0b0c0d',
                    }).then(async (res) => {
                        if (res.isConfirmed) {
                            const dato = await response.json();
                            if (data?.roles?.[0] == 'superadmin') {
                                router.push(
                                    `/dashboard/superadmin/consorcios/All/${dato.id}`
                                );
                            } else {
                                router.push(
                                    `/dashboard/admin/consortiums/${dato.id}`
                                );
                            }
                        }
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error de información',
                    text: (error as Error).message,
                    icon: 'error',
                    confirmButtonColor: '#0b0c0d',
                });
            }
        }
    };

    useEffect(() => {
        if (data?.roles?.[0] == 'cadmin') {
            setConsortiumRegister({
                ...consortiumRegister,
                c_admin: data.id,
            });
        }
    }, [token]);

    useEffect(() => {
        const cuitErrors = validateCuit(consortiumRegister.cuit!);
        const numberErrors = validateNumbers(
            consortiumRegister.first_due_day!,
            consortiumRegister.interest_rate!
        );

        setConsortiumRegisterError((prevErrors) => ({
            ...prevErrors,
            ...cuitErrors,
            ...numberErrors,
        }));
    }, [consortiumRegister]);

    return (
        <div className="w-full h-auto p-4 text-white border rounded-[40px]">
            <div className="my-2 text-center">
                <h1 className="mb-2 text-2xl font-bold">
                    {update ? ' Modificar Consorcio' : ' Crear Nuevo Consorcio'}
                </h1>
            </div>
            <form
                className="mx-10 my-5"
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col w-2/4">
                        <Label htmlFor="name">Razon social:</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Consorcio Edificio Rivadavia 456"
                            value={consortiumRegister.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="cuit">CUIT:</Label>
                        <Input
                            id="cuit"
                            name="cuit"
                            type="cuit"
                            placeholder="30030345670"
                            value={consortiumRegister.cuit}
                            onChange={handleChange}
                            disabled={update}
                        />
                        {consortiumRegisterError.cuit &&
                            consortiumRegister.cuit && (
                                <span className="self-end text-xs text-redd">
                                    {consortiumRegisterError.cuit}
                                </span>
                            )}
                    </div>
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="suterh_key">Clave SUTERH:</Label>
                        <Input
                            id="suterh_key"
                            name="suterh_key"
                            type="text"
                            placeholder="12345/01"
                            value={consortiumRegister.suterh_key}
                            onChange={handleChange}
                        />
                        {consortiumRegisterError.suterh_key &&
                            consortiumRegister.suterh_key && (
                                <span className="self-end text-xs text-redd">
                                    {consortiumRegisterError.suterh_key}
                                </span>
                            )}
                    </div>
                </div>

                <div className="flex flex-row gap-4">
                    <div className="flex flex-col w-2/4">
                        <Label htmlFor="street_name">Dirección:</Label>
                        <Input
                            id="street_name"
                            name="street_name"
                            type="text"
                            placeholder="Av. Rivadavia"
                            value={consortiumRegister.street_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="building_number">Altura:</Label>
                        <Input
                            id="building_number"
                            name="building_number"
                            type="number"
                            placeholder="456"
                            value={
                                consortiumRegister.building_number == 0
                                    ? ''
                                    : consortiumRegister.building_number
                            }
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="category">
                            Categoría del edificio:
                        </Label>
                        <Input
                            id="category"
                            name="category"
                            type="number"
                            placeholder="1"
                            value={
                                consortiumRegister.category == 0
                                    ? ''
                                    : consortiumRegister.category
                            }
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex flex-row gap-4">
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="country">País:</Label>
                        <Input
                            id="country"
                            name="country"
                            type="text"
                            placeholder="Argentina"
                            value={consortiumRegister.country}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="province">Provincia:</Label>
                        <Input
                            id="province"
                            name="province"
                            type="text"
                            placeholder="CABA"
                            value={consortiumRegister.province}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="city">Ciudad:</Label>
                        <Input
                            id="city"
                            name="city"
                            type="text"
                            placeholder="CABA"
                            value={consortiumRegister.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="zip_code">Código postal:</Label>
                        <Input
                            id="zip_code"
                            name="zip_code"
                            type="text"
                            placeholder="C1002AAP"
                            value={consortiumRegister.zip_code}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex flex-row gap-4">
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="floors">Cantidad de pisos:</Label>
                        <Input
                            id="floors"
                            name="floors"
                            type="number"
                            placeholder="5"
                            value={
                                consortiumRegister.floors == 0
                                    ? ''
                                    : consortiumRegister.floors
                            }
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="ufs">Cantidad de UF:</Label>
                        <Input
                            id="ufs"
                            name="ufs"
                            type="number"
                            placeholder="17"
                            value={
                                consortiumRegister.ufs == 0
                                    ? ''
                                    : consortiumRegister.ufs
                            }
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="interest_rate">Tasa de interés:</Label>
                        <Input
                            id="interest_rate"
                            name="interest_rate"
                            type="number"
                            placeholder="00.00"
                            step="0.01"
                            value={
                                consortiumRegister.interest_rate === 0
                                    ? ''
                                    : consortiumRegister.interest_rate
                            }
                            onChange={handleChange}
                        />
                        {consortiumRegisterError.interest_rate &&
                            consortiumRegister.interest_rate && (
                                <span className="self-end text-xs text-redd">
                                    {consortiumRegisterError.interest_rate}
                                </span>
                            )}
                    </div>
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="first_due_day">
                            Vencimiento de expensas:
                        </Label>
                        <Input
                            id="first_due_day"
                            name="first_due_day"
                            type="number"
                            placeholder="10"
                            step="1"
                            value={
                                consortiumRegister.first_due_day === 0
                                    ? ''
                                    : consortiumRegister.first_due_day
                            }
                            onChange={handleChange}
                        />
                        {consortiumRegisterError.first_due_day &&
                            consortiumRegister.first_due_day !== 0 && (
                                <span className="self-end text-xs text-redd">
                                    {consortiumRegisterError.first_due_day}
                                </span>
                            )}
                    </div>
                </div>
                <div className="flex items-center w-full gap-2">
                    <div className="flex w-full">
                        <div className="flex flex-col w-full">
                            {data?.roles?.[0] === 'superadmin' && (
                                <Label htmlFor="c_admin">Administrador:</Label>
                            )}{' '}
                            {data?.roles?.[0] === 'superadmin' && (
                                <Select
                                    id="c_admin"
                                    name="c_admin"
                                    value={
                                        consortiumRegister.c_admin &&
                                        typeof consortiumRegister.c_admin ===
                                            'object'
                                            ? consortiumRegister.c_admin.id
                                            : consortiumRegister.c_admin
                                    }
                                    onChange={handleSelect}
                                >
                                    <option value="" disabled>
                                        Selecciona un Administrador
                                    </option>
                                    {admins &&
                                        admins?.map((admin) => {
                                            return (
                                                <option
                                                    key={admin.id}
                                                    value={admin.id}
                                                >
                                                    {admin.name}
                                                </option>
                                            );
                                        })}
                                </Select>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-5">
                    <Button type="submit" className="w-1/3 py-2 rounded-[40px]">
                        {update ? 'Modificar Consorcio' : 'Crear Consorcio'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FormRegisterConsortium;
