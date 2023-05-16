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
    <div className="flex mt-[30px] flex mx-auto justify-between items-center w-[550px] border-[3px] rounded-[8px] border-[#243c5a]">
      <div className="px-[10px] w-[100%] overflow-hidden  relative  ">
        <input
          className="text-[15px] w-[100%]"
          placeholder="Search"
          value={searchText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button className="bg-[#243c5a] w-[70px] h-[30px] text-[8px] text-[#ffffff]" onClick={handleSearch}>
        SEARCH
      </button>
    </div>
  );
}
