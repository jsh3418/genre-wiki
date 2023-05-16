import { SearchBar } from './SearchBar';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };
  return (
    <header className=" flex flex-col justify-center items-center">
      <div className="text-[50px] my-[25px] cursor-pointer" onClick={goHome}>
        GENRE WIKI
      </div>
      <SearchBar />
    </header>
  );
}
