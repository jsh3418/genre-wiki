import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    search();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  const search = () => {
    const path = `/search/${searchText}`;
    navigate(path);
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="border-[#424242] overflow-hidden flex flex mx-auto justify-between items-center w-[550px] border-[2.2px] rounded-[8px] ">
      <div className="px-[10px] w-[100%]   relative">
        <input
          className="text-[15px] w-[100%]"
          placeholder="Search"
          value={searchText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button className="bg-[#FFFF64] w-[70px] h-[30px] text-[11px] text-[black]" onClick={handleSearch}>
        SEARCH
      </button>
    </div>
  );
}
