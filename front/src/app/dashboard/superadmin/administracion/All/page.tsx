"use client";

// Estilos y componentes
import { Button, ContainerDashboard, Select, Title } from "@/components/ui";
import SearchBar from "@/components/SearchBar/SearchBar";

// Interfaces
import { IAdmin } from "@/Interfaces/admin.interfaces";

// Endpoints
import { getAdmins } from "@/helpers/fetch.helper.admin";

// Hooks
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import Link from "next/link";

// -------------------

const Page = () => {
  useAuth();
  const pathname = usePathname();
  const { token } = useSesion();
  const [admins, setAdmins] = useState<IAdmin[]>([]);
  const [result, setResult] = useState<IAdmin[]>([]);
  const [noMatches, setNoMatches] = useState(false);

  useEffect(() => {
    const fetchData = async (token: string) => {
      const response = await getAdmins(token);
      if (response) {
        const data = await response.json();
        setAdmins(data);
        setResult(data);
        console.log(data);
      }
    };
    if (token) {
      fetchData(token);
    }
  }, [token, pathname]);

  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim().toLocaleLowerCase();

    if (!trimmedQuery) {
      setResult(admins || []);
      setNoMatches(false);
      return;
    }

    const filteredData = (admins || []).filter((admin: IAdmin) => {
      return Object.values(admin).some((value) => {
        return (
          typeof value === "string" &&
          value.toLocaleLowerCase().includes(trimmedQuery)
        );
      });
    });

    setResult(filteredData);
    setNoMatches(filteredData.length === 0);
  };

  const handleSort = (field: keyof IAdmin, order: "asc" | "desc") => {
    const sortedData = [...result].sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return order === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else if (typeof valueA === "number" && typeof valueB === "number") {
        return order === "asc" ? valueA - valueB : valueB - valueA;
      } else {
        return 0;
      }
    });

    setResult(sortedData);
  };

  return (
    <div className="h-screen text-white">
      <ContainerDashboard>
        <Title>
          Administración{" "}
          <span className="text-2xl font-thin">
            | Todas las administraciones
          </span>
        </Title>
        <div className="w-[95%] flex mt-5">
          <div className="flex w-1/2">
            <SearchBar onSearch={handleSearch} searchString="Administrador" />
          </div>

          <div className="flex w-1/2">
            <div className="flex items-center justify-center w-full gap-3 ">
              <p className="text-lg text-white">Filtrar por:</p>
              <div className="w-2/3">
                <Select
                  onChange={(e) =>
                    handleSort(e.target.value as keyof IAdmin, "asc")
                  }
                >
                  <option value="name">Nombre</option>
                  <option value="cuit">CUIT</option>
                  <option value="phone_numer">Teléfono</option>
                  <option value="email">Email</option>
                </Select>
              </div>
            </div>
            <div className="w-1/3">
              <Select
                onChange={(e) =>
                  handleSort("name", e.target.value as "asc" | "desc")
                }
              >
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-4 my-6">
          {noMatches ? (
            <p className="mt-5 text-2xl">
              No hay coincidencias con los administradores registrados
            </p>
          ) : admins?.length > 0 ? (
            result?.map((elemento) => {
              return (
                <Link
                  key={elemento.id}
                  href={`/dashboard/superadmin/administracion/All/${elemento.id}`}
                  className="text-black flex w-3/4 rounded border border-black mx-2 p-3 bg-[#dadada] hover:scale-110 hover:transition hover:duration-700"
                >
                  <div className="flex justify-between w-full text-center">
                    <p className="w-[25%]">{elemento.name}</p>
                    <p className="w-[25%]">{elemento.cuit}</p>
                    <p className="w-[25%]">{elemento.phone_number}</p>
                    <p className="w-[25%]">{elemento.email}</p>
                  </div>
                </Link>
              );
            })
          ) : (
            <div>Todavia no hay administradores</div>
          )}
        </div>
      </ContainerDashboard>
    </div>
  );
};

export default Page;
