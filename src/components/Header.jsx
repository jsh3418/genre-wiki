import { SearchBar } from './SearchBar';

export function Header() {
  return (
    <header className=" flex flex-col justify-center items-center">
      <div className="text-[50px]">GENRE WIKI</div>
      <SearchBar />
    </header>
  );
}
