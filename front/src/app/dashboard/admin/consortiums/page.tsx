"use client";

import ConsortiumsAdmin from "@/components/ConsortiumAdmin/ConsortiumAdmin";
import SearchBar from "@/components/SearchBar/SearchBar";
import { ContainerDashboard, Title } from "@/components/ui";
import { consortiumsData } from "@/utils/mockDataConsor";
import { useState } from "react";

const Consortium = () => {
    const [filteredData, setFilteredData] = useState(consortiumsData);

    const handleSearch = (query: string) => {
        const filtered = consortiumsData.filter(
            (result) =>
                result.name.toLowerCase().includes(query.toLowerCase()) ||
                result.street_name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return (
        <div>
            <ContainerDashboard>
                <Title>Consorcios</Title>
                <SearchBar onSearch={handleSearch} />
                <ConsortiumsAdmin />
            </ContainerDashboard>
        </div>
    );
};

export default Consortium;
