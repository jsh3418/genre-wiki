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
      <div
        className="font-suit font-extra-light my-[50px] text-[35px] my-[25px] cursor-pointer"
        onClick={() => navigate('/')}
      >
        딱 좐러 말해
      </div>
      <SearchBar />
      <div className="left-[280px] top-[-165px] gap-[8px] relative flex">
        {isLogin ? (
          <>
            <button
              className="font-normal font-black text-[6px] font-[200] border-[1.1px] border-[#424242] rounded-[10px] w-[60px]
        justify-center items-center h-[20px] bg-[#FFFF64]  flex"
              onClick={() => {
                setUserId('');
                setUserData({});
                localStorage.removeItem('userId');
                navigate('/');
              }}
            >
              LOGOUT
            </button>
            <button
              className="font-normal font-black text-[6px] font-[200] border-[1.1px] border-[#424242] rounded-[10px] w-[70px]
  justify-center items-center h-[20px] bg-[#FFFF64]  flex"
              onClick={() => navigate('/my-page')}
            >
              MY GENRE
            </button>
          </>
        ) : (
          <>
            <button
              className="font-normal font-black text-[6px] font-[200] border-[1.1px] border-[#424242] rounded-[10px] w-[60px]
        justify-center items-center h-[20px] bg-[#FFFF64] flex"
              onClick={() => navigate('/sign-up')}
            >
              SIGN UP
            </button>
            <button
              className="font-normal font-black text-[6px] font-[200] border-[1.1px] border-[#424242] rounded-[10px] w-[60px]
          justify-center items-center h-[20px] bg-[#FFFF64] flex"
              onClick={() => navigate('/login')}
            >
              LOGIN
            </button>
          </>
        )}
      </div>
    </header>
  );
}
