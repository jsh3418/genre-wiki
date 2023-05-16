export function SearchBar() {
  return (
    <div className="border-[black] overflow-hidden flex flex mx-auto justify-between items-center w-[550px] border-[3px] rounded-[8px] ">
      <div className="px-[10px] w-[100%]   relative  ">
        <input className="text-[15px] w-[100%]" placeholder="Search" />
      </div>
      <button className="bg-[#FFFF64] w-[70px] h-[30px] text-[11px] text-[black]">SEARCH</button>
    </div>
  );
}
