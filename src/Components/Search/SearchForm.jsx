import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('regular'); // Added state for search type

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query, searchType);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search items..."
      />
      <button type="submit">Search</button>
      <div>
        <label>
          <input
            type="radio"
            value="regular"
            checked={searchType === 'regular'}
            onChange={() => setSearchType('regular')}
          />
          Regular Search
        </label>
        <label>
          <input
            type="radio"
            value="fuzzy"
            checked={searchType === 'fuzzy'}
            onChange={() => setSearchType('fuzzy')}
          />
          Fuzzy Search
        </label>
      </div>
    </form>
  );
};

export default SearchForm;

