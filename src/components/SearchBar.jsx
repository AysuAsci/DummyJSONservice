import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div className="search-bar">
            <input 
                type="text" 
                value={searchTerm} 
                onChange={handleSearch} 
                placeholder="Search..." 
                className="search-input"
            />
        </div>
    );
};

export default SearchBar;
