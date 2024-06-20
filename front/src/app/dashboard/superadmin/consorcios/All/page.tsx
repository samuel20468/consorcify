"use client";

// Estilos y componentes
import { ContainerDashboard, Select, Title } from "@/components/ui";
import SearchBar from "@/components/SearchBar/SearchBar";
import ConsortiumCard from "@/components/ConsortiumCard/ConsortiumCard";

// Endpoints
import { getConsortiums } from "@/helpers/fetch.helper.consortium";

// Interfaces
import { IConsortium } from "@/Interfaces/consortium.interfaces";

// Hooks
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import Link from "next/link";

// ---------------------------

const Page = () => {
  useAuth();
  const { token } = useSesion();
  const [consortiums, setConsortiums] = useState<IConsortium[]>([]);
  const [result, setResult] = useState<IConsortium[]>([]);
  const [noMatches, setNoMatches] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const fetchData = async (token: string) => {
      const response = await getConsortiums(token);

      if (response) {
        const data = await response.json();
        setConsortiums(data);
        setResult(data);
      }
    };
    if (token) {
      fetchData(token);
    }
  }, [token, path]);

  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim().toLocaleLowerCase();

    if (!trimmedQuery) {
      setResult(consortiums || []);
      setNoMatches(false);
      return;
    }

    const filteredData = (consortiums || []).filter(
      (consortium: IConsortium) => {
        return Object.values(consortium).some((value) => {
          return (
            typeof value === "string" &&
            value.toLocaleLowerCase().includes(trimmedQuery)
          );
        });
      }
    );

    setResult(filteredData);
    setNoMatches(filteredData.length === 0);
  };

  const handleSort = (field: keyof IConsortium, order: "asc" | "desc") => {
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
          Consorcios{" "}
          <span className="text-2xl font-thin">| Todos los consorcios</span>
        </Title>
        <div className="w-[95%] flex mt-5">
          <div className="flex w-1/2">
            <SearchBar onSearch={handleSearch} searchString="Consorcio" />
          </div>

          <div className="flex w-1/2">
            <div className="flex items-center justify-center w-full gap-3 ">
              <p className="text-lg text-white">Filtrar por:</p>
              <div className="w-2/3">
                <Select
                  onChange={(e) =>
                    handleSort(e.target.value as keyof IConsortium, "asc")
                  }
                >
                  <option value="name">Nombre</option>
                  <option value="street_name">Calle</option>
                  <option value="city">Ciudad</option>
                  <option value="province">Provincia</option>
                  <option value="country">País</option>
                  <option value="zip_code">Código Postal</option>
                  <option value="category">Categoría</option>
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
        <div className="flex flex-wrap items-center justify-center w-full my-6">
          {noMatches ? (
            <p className="mt-5 text-2xl">
              No hay coincidencias con los consorcios registrados
            </p>
          ) : (
            result?.map((consortium: IConsortium) => (
              <Link
                key={consortium.id}
                href={`/dashboard/superadmin/consorcios/All/${consortium.id}`}
                className="flex flex-col items-center justify-center w-[45%] my-4"
              >
                <ConsortiumCard consortium={consortium} />
              </Link>
            ))
          )}
        </div>
      </ContainerDashboard>
    </div>
  );
};

export default Page;
