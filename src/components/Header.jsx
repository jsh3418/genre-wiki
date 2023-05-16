import { SearchBar } from './SearchBar';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();
  const goHome = () => {
    console.dir(navigate);
    navigate('/');
  };
  const goLogin = () => {
    console.dir(navigate);
    navigate('/login');
    console.log('되면되야함');
  };
  return (
    <header className=" flex flex-col justify-center items-center">
      <div className="text-[50px] my-[25px] cursor-pointer" onClick={goHome}>
        GENRE WIKI
      </div>
      <SearchBar />
      <div className="left-[350px] top-[-135px] gap-[8px] relative flex">
        <button className="font-[25] font-black text-[12px] border-[1.1px] border-[black] rounded-[4px] w-[65px] justify-center items-center h-[25px] bg-[#FFFF64]  flex">
          회원가입
        </button>
        <button
          className="font-[25] font-black text-[12px] border-[1.1px] border-[black] rounded-[4px] w-[65px] justify-center items-center h-[25px] bg-[#FFFF64]  flex"
          onClick={goLogin}
        >
          로그인
        </button>
      </div>
    </header>
  );
}
