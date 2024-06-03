"use client";
import React, { useState } from "react";
import SearchBar from "@/components/SearchBar/SearchBar";
import { consortiumsData } from "@/utils/mockDataConsor";

const SearchPage = () => {
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
        <main className="flex justify-center">
            <h1>Buscar</h1>
            <SearchBar onSearch={handleSearch} />
            <div className="results">
                {filteredData.map((result, index) => (
                    <div className="result-card" key={index}>
                        <h2>{result.name}</h2>
                        <p>
                            Dirección: {result.street_name}{" "}
                            {result.building_number}
                        </p>
                        <p>CUIT: {result.cuit}</p>
                    </div>
                ))}
            </div>
        </main>
    );
};
export default SearchPage;
