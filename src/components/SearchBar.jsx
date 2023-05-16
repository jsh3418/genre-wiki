export function SearchBar() {
  return (
    <div className="flex mt-[30px] flex mx-auto justify-between items-center w-[550px] border-[3px] rounded-[8px] border-[#243c5a]">
      <div className="px-[10px] w-[100%] overflow-hidden  relative  ">
        <input className="text-[15px] w-[100%]" placeholder="Search" />
      </div>
      <button className="bg-[#243c5a] w-[70px] h-[30px] text-[8px] text-[#ffffff]">SEARCH</button>
    </div>
  );
}
