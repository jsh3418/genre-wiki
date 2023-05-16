import { SearchBar } from './SearchBar';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };
  const goRegister = (id) => {
    navigate(`/${id}`);
  };

  return (
    <header className=" flex flex-col justify-center items-center">
      <div className="text-[50px] my-[25px] cursor-pointer" onClick={goHome}>
        GENRE WIKI
      </div>
      <SearchBar />
      <div className="left-[350px] top-[-135px] gap-[8px] relative flex">
        <button
          className="font-[5] font-black text-[12px] border-[1.3px] border-[#424242] rounded-[4px] w-[65px]
        justify-center items-center h-[25px] bg-[#FFFF64]  flex"
          onClick={() => goRegister('sign-up')}
        >
          회원가입
        </button>
        <button
          className="font-[5] font-black text-[12px] border-[1.3px] border-[#424242] rounded-[4px] w-[65px]
          justify-center items-center h-[25px] bg-[#FFFF64]  flex"
          onClick={() => goRegister('login')}
        >
          로그인
        </button>
      </div>
    </header>
  );
}
