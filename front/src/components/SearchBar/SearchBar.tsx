// Estilos y componentes
import { Input } from "../ui";

// Interfaces
interface SearchBarProps {
    onSearch: (query: string) => void;
}

// Hooks
import { useState, ChangeEvent } from "react";

// -------------------

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState<string>("");

    let timeout: NodeJS.Timeout | null = null;

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);

        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            onSearch(newQuery);
        }, 500);
    };

    return (
        <div className="flex items-center justify-center w-full">
            <h1 className="px-4 text-lg">Buscar consorcio: </h1>
            <div className="w-1/4">
                <Input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Buscar..."
                />
            </div>
        </div>
    );
};

export default SearchBar;
