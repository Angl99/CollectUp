import React, { useState } from 'react';
import SearchForm from './SearchForm';

const SearchPage = () => {
  const [items, setItems] = useState([]);

  // Function to fetch regular search results
  const fetchSearchResults = async (query) => {
    const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.items;
  };

  // Function to fetch fuzzy search results
  const fetchFuzzySearchResults = async (query) => {
    const response = await fetch(`/api/fuzzy-search?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.items;
  };

  // Handle search based on search type
  const handleSearch = async (query, searchType) => {
    let results = [];
    if (searchType === 'regular') {
      results = await fetchSearchResults(query);
    } else if (searchType === 'fuzzy') {
      results = await fetchFuzzySearchResults(query);
    }
    setItems(results);
  };

  return (
    <div>
      <h1>Search Items</h1>
      <SearchForm onSearch={handleSearch} />
      <div>
        {items.length === 0 ? (
          <p>No items found</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.ean}>{item.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

