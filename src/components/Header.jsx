import { SearchBar } from './SearchBar';

export function Header() {
  return (
    <header className="flex flex-col">
      {/* <div className="h-[100px] leading-[100px] text-center text-[50px]"> */}
      <div className="mx-auto m-[20px] text-[50px] text-[black]]">GENRE WIKI</div>
      {/* </div> */}
      <div className="mx-auto mt-[10px] flex items-center">
        <SearchBar />
      </div>
    </header>
  );
}
