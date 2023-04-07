import { useState } from 'react';

function useSearch() {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return [searchText, handleSearch];
}

export default useSearch;
