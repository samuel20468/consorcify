import { useState, ChangeEvent } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState<string>('');

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

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div id="searchBar">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Buscar..."
            />
            <button onClick={handleSearch}>Buscar</button>
        </div>
    );
};

export default SearchBar;
