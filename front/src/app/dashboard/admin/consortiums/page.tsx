"use client";

// Estilos y componentes
import { Button, ContainerDashboard, Select, Title } from "@/components/ui";
import ConsortiumDetails from "@/components/ConsortiumDetails/ConsortiumDetails";

// Endpoints
import { getConsortiumsByAdminId } from "@/helpers/fetch.helper.consortium";

// Interfaces
import { IConsortium } from "@/Interfaces/consortium.interfaces";

// Hooks
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import Link from "next/link";

// ----------------------

const Consortium = () => {
  useAuth();
  const { token, data } = useSesion();
  const pathname = usePathname();
  const [consortiums, setConsortiums] = useState<IConsortium[]>([]);
  const [selectedConsortiumId, setSelectedConsortiumId] = useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getConsortiumsByAdminId(data.id, token);
        if (response) {
          const data = await response.json();
          setConsortiums(data);
          if (data.length > 0) {
            setSelectedConsortiumId(data[0].id);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
      fetchData();
    }
  }, [token, pathname]);

  // Filtros

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedConsortiumId(event.target.value);
  };

  const selectedConsortium = consortiums.find(
    (c) => c.id === selectedConsortiumId
  );

  return (
    <div className="h-screen">
      <ContainerDashboard>
        <Title>Consorcios</Title>
        <div className="flex items-center justify-between w-[98%]">
          <div className="w-2/3">
            <Select
              id="consortium_id"
              name="consortium_id"
              className="w-1/3 h-10 px-2 my-1 text-gray-200 rounded-md shadow-xl cursor-pointer bg-input focus:outline-none no-spinners"
              value={selectedConsortiumId || ""}
              onChange={handleSelectChange}
            >
              {consortiums.length > 0 &&
                consortiums.map((consortium) => (
                  <option value={consortium.id} key={consortium.id}>
                    {consortium.name}
                  </option>
                ))}
            </Select>
          </div>
          <div className="flex w-1/3">
            <Link
              className="flex justify-end w-full mr-5"
              href={"/addConsortium"}
            >
              <Button className="w-1/2 p-2 rounded-[40px]">
                Agregar Consorcio
              </Button>
            </Link>
          </div>
        </div>
        {selectedConsortium ? (
          <>
            <div className="flex justify-center gap-5 w-[90%]">
              <ConsortiumDetails {...selectedConsortium} />
            </div>
            <div className="flex justify-center w-2/4 mt-5 mb-10">
              <Link
                href={`/dashboard/admin/consortiums/${selectedConsortiumId}`}
                className="w-1/4"
              >
                <Button className="w-full p-2 rounded-[40px]">
                  Ver Detalle
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="p-8">
            <h1 className="text-2xl">Aún no hay consorcios registrados</h1>
          </div>
        )}
      </ContainerDashboard>
    </div>
  );
};

export default Consortium;
