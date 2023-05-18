import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from './SearchBar';

export function Header({ setUserId, setUserData }) {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    setIsLogin(Boolean(userId));
  });

  return (
    <header className=" flex flex-col justify-center items-center">
      <div className="text-[50px] my-[25px] cursor-pointer" onClick={() => navigate('/')}>
        GENRE WIKI
      </div>
      <SearchBar />
      <div className="left-[350px] top-[-135px] gap-[8px] relative flex">
        {isLogin ? (
          <>
            <button
              className="font-[5] font-black text-[12px] border-[1.3px] border-[#424242] rounded-[4px] w-[65px]
        justify-center items-center h-[25px] bg-[#FFFF64]  flex"
              onClick={() => {
                setUserId('');
                setUserData({});
                localStorage.removeItem('userId');
                navigate('/');
              }}
            >
              로그아웃
            </button>
            <button
              className="font-[5] font-black text-[12px] border-[1.3px] border-[#424242] rounded-[4px] w-[65px]
  justify-center items-center h-[25px] bg-[#FFFF64]  flex"
              onClick={() => navigate('/my-page')}
            >
              마이 장르
            </button>
          </>
        ) : (
          <>
            <button
              className="font-[5] font-black text-[12px] border-[1.3px] border-[#424242] rounded-[4px] w-[65px]
        justify-center items-center h-[25px] bg-[#FFFF64] flex"
              onClick={() => navigate('/sign-up')}
            >
              회원가입
            </button>
            <button
              className="font-[5] font-black text-[12px] border-[1.3px] border-[#424242] rounded-[4px] w-[65px]
          justify-center items-center h-[25px] bg-[#FFFF64] flex"
              onClick={() => navigate('/login')}
            >
              로그인
            </button>
          </>
        )}
      </div>
    </header>
  );
}
