import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from '../firebase';

export function AuthPage({ setUserId }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { pathname } = useLocation();
  const [authMode, setAuthMode] = useState(pathname);
  const navigate = useNavigate();
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    setAuthMode(pathname);
  }, [pathname]);

  const handleLogin = (event) => {
    event.preventDefault();

    if (authMode === '/login') {
      login(email, password);
      return;
    }

    createUser(email, password);
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      localStorage.setItem('userId', userCredential.user.uid);
      setUserId(userCredential.user.uid);
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        alert('유효한 이메일이 아닙니다.');

        return;
      }

      if (error.code === 'auth/user-not-found') {
        alert('회원정보를 찾을 수 없습니다. 이메일을 확인해주세요.');

        return;
      }

      if (error.code === 'auth/wrong-password') {
        alert('비밀번호가 틀렸습니다. 비밀번호를 확인해주세요.');

        return;
      }
    }
  };

  const createUser = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);

      localStorage.setItem('userId', response.user.uid);

      setUserId(response.user.uid);
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('이미 가입된 이메일입니다.');

        return;
      }

      if (error.code === 'auth/weak-password') {
        alert('비밀번호는 최소 6자 이상 작성해주세요.');
      }
    }
  };

  return (
    <form
      className="flex flex-col mt-[25px] gap-[20px] px-[35px] py-[20px] w-[450px] h-[500px]
    font-[500] mx-auto border-[#969696] border-[1px]"
    >
      <div className="mx-[50px] my-[10px] text-[20px] text-center">{authMode === '/login' ? '로그인' : '회원가입'}</div>
      <div className="flex flex-col gap-[25px]">
        <div className=" w-[350px] whitespace-nowrap  w-[50px]">이메일</div>
        <input
          className="mx-auto px-[15px] w-[350px] border-[#969696] h-[50px]  border-[1px]"
          placeholder="이메일"
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          value={email}
        />
        <div className=" w-[350px] whitespace-nowrap  w-[50px]">비밀번호</div>
        <input
          className="mx-auto px-[15px] w-[350px] border-[#969696] h-[50px]  border-[1px]"
          placeholder="비밀번호"
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          value={password}
        />
      </div>
      <button
        className="my-[30px] border-[1.8px] border-[#969696] mx-auto w-[350px] h-[50px] bg-[#ffff64] font-[700]"
        onClick={handleLogin}
      >
        {authMode === '/login' ? '로그인' : '회원가입'}
      </button>
    </form>
  );
}
