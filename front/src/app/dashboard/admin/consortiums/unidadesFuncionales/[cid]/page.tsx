'use client';

// Estilos y componentes
import { ContainerDashboard, Title } from '@/components/ui';
import Swal from 'sweetalert2';

// Interfaces
import { IFunctionalUnits } from '@/Interfaces/functionalUnits.interfaces';

// Endpoints
import { getFuncionalUnits } from '@/helpers/fetch.helper.uf';

// Hooks
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import useAuth from '@/helpers/useAuth';
import useSesion from '@/helpers/useSesion';
import { getConsortiumById } from '@/helpers/fetch.helper.consortium';
import { IConsortium } from '@/Interfaces/consortium.interfaces';

// --------------------

const AllFunctionalUnits = () => {
    useAuth();
    const { cid }: { cid: string } = useParams();
    const { token } = useSesion();
    const params: { id: string } = useParams();
    const [functionalUnits, setFunctionalUnits] = useState<IFunctionalUnits[]>(
        []
    );
    const [consortiumName, setConsortiumName] = useState<string>('');
    const [consortiumId, setConsortiumId] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const unitsResponse = await getFuncionalUnits(token, cid);
                if (unitsResponse) {
                    setFunctionalUnits(unitsResponse);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se ha podido obtener los datos de las unidades funcionales',
                        confirmButtonText: 'Aceptar',
                    });
                }

                const consortiumResponse = await getConsortiumById(cid, token);
                if (consortiumResponse) {
                    const consortiumData: IConsortium =
                        await consortiumResponse.json();
                    setConsortiumName(consortiumData.name);
                    setConsortiumId(consortiumData.id);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se ha podido obtener los datos del consorcio',
                        confirmButtonText: 'Aceptar',
                    });
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fetchData();
        }
    }, [token, cid]);

    return (
        <div className="h-screen">
            <ContainerDashboard>
                <Title>
                    Consorcios{' '}
                    <span className="text-2xl font-thin">
                        | {consortiumName}{' '}
                    </span>
                    <span className="text-xl font-thin">
                        | Unidades Funcionales
                    </span>
                </Title>

                {/* <div className="flex items-center justify-end w-[98%]">
                    <div className="flex w-1/3">
                        <Link
                            href={`/dashboard/admin/consortiums/${params.id}/${consortiumId}`}
                            as={`/dashboard/admin/consortiums/${params.id}/addunidad`}
                            className="flex justify-end w-full mr-5"
                        >
                            <Button className="w-1/2 p-2 rounded-[40px]">
                                Agregar Unidad Funcional
                            </Button>
                        </Link>
                    </div>
                </div> */}

                <div className="w-[90%] border-t border-b border-white flex justify-between p-2 my-5 text-center">
                    <div className="w-1/6 text-xl">Número de UF</div>
                    <div className="w-1/6 text-xl">Tipo de UF</div>
                    <div className="w-1/6 text-xl">Locación</div>
                    <div className="w-1/6 text-xl">Codigo Unidad</div>
                    <div className="w-1/6 text-xl">Propietario</div>
                    <div className="w-1/6 text-xl">Email</div>
                </div>
                {functionalUnits.length !== 0 ? (
                    functionalUnits.map((unit) => (
                        <div
                            key={unit.id}
                            className="flex justify-between py-2 text-center w-[90%] bg-neutral-50 rounded-lg text-blackk mb-5"
                        >
                            <div className="w-1/6">
                                <h1>{unit.number}</h1>
                            </div>
                            <div className="w-1/6">
                                <h1>{unit.type}</h1>
                            </div>
                            <div className="w-1/6">
                                <h1>{unit.location}</h1>
                            </div>
                            <div className="w-1/6">
                                <h1>{unit.code}</h1>
                            </div>
                            <div className="w-1/6">
                                <h1>{unit.owner}</h1>
                            </div>
                            <div className="w-1/6">
                                <h1>{unit.owner_email}</h1>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-8">
                        <h1 className="text-2xl">No hay Unidades Fucionales</h1>
                    </div>
                )}
            </ContainerDashboard>
        </div>
    );
};

export default AllFunctionalUnits;
