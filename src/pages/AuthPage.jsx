import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export function AuthPage() {
  const { pathname } = useLocation();
  const [state, setState] = useState(pathname);
  useEffect(() => {
    setState(pathname);
  }, [pathname]);

  return (
    <div
      className="flex flex-col mt-[25px] gap-[20px] px-[35px] py-[20px] w-[450px] h-[500px]
    font-[500] mx-auto border-[#969696] border-[1px]"
    >
      <div className="mx-[50px] my-[10px] text-[20px] text-center">{state === '/login' ? '로그인' : '회원가입'}</div>
      <div className="flex flex-col gap-[25px]">
        <div className=" w-[350px] whitespace-nowrap  w-[50px]">이메일</div>
        <input className="mx-auto px-[15px] w-[350px] border-[#969696] h-[50px]  border-[1px]" placeholder="이메일" />
        <div className=" w-[350px] whitespace-nowrap  w-[50px]">비밀번호</div>
        <input className="mx-auto px-[15px] w-[350px] border-[#969696] h-[50px]  border-[1px]" placeholder="비밀번호" />
      </div>
      <button className="my-[30px] border-[1.8px] border-[#969696] mx-auto w-[350px] h-[50px] bg-[#ffff64] font-[700]">
        {state === '/login' ? '로그인' : '회원가입'}
      </button>
    </div>
  );
}

// {
//   "id": 6,
//   "name": "country",
//   "count": 0
// },
// {
//   "id": 7,
//   "name": "blues",
//   "count": 0
// },
// {
//   "id": 8,
//   "name": "reggae",
//   "count": 0
// },
// {
//   "id": 9,
//   "name": "heavy metal",
//   "count": 0
// },
// {
//   "id": 10,
//   "name": "soul",
//   "count": 0
// },
// {
//   "id": 11,
//   "name": "punk",
//   "count": 0
// },
// {
//   "id": 12,
//   "name": "funk",
//   "count": 0
// },
// {
//   "id": 13,
//   "name": "rnb",
//   "count": 0
// },
// {
//   "id": 14,
//   "name": "techno",
//   "count": 0
// },
// {
//   "id": 15,
//   "name": "house",
//   "count": 0
// },
// {
//   "id": 16,
//   "name": "alternative rock",
//   "count": 0
// },
// {
//   "id": 17,
//   "name": "dubstep",
//   "count": 0
// },
// {
//   "id": 18,
//   "name": "disco",
//   "count": 0
// },
// {
//   "id": 19,
//   "name": "grunge",
//   "count": 0
// },
// {
//   "id": 20,
//   "name": "electronica",
//   "count": 0
// },
// {
//   "id": 21,
//   "name": "doo wop",
//   "count": 0
// },
// {
//   "id": 22,
//   "name": "indie rock",
//   "count": 0
// },
// {
//   "id": 23,
//   "name": "hard rock",
//   "count": 0
// },
// {
//   "id": 24,
//   "name": "folk",
//   "count": 0
// },
// {
//   "id": 25,
//   "name": "swing",
//   "count": 0
// },
// {
//   "id": 26,
//   "name": "new wave",
//   "count": 0
// },
// {
//   "id": 27,
//   "name": "emo",
//   "count": 0
// },
// {
//   "id": 28,
//   "name": "bluegrass",
//   "count": 0
// },
// {
//   "id": 29,
//   "name": "gospel",
//   "count": 0
// },
// {
//   "id": 30,
//   "name": "ska",
//   "count": 0
// },
// {
//   "id": 31,
//   "name": "ambient",
//   "count": 0
// },
// {
//   "id": 32,
//   "name": "trance",
//   "count": 0
// },
// {
//   "id": 33,
//   "name": "synth pop",
//   "count": 0
// },
// {
//   "id": 34,
//   "name": "psychedelic rock",
//   "count": 0
// },
// {
//   "id": 35,
//   "name": "progressive rock",
//   "count": 0
// },
// {
//   "id": 36,
//   "name": "baroque pop",
//   "count": 0
// },
// {
//   "id": 37,
//   "name": "big band",
//   "count": 0
// },
// {
//   "id": 38,
//   "name": "glam rock",
//   "count": 0
// },
// {
//   "id": 39,
//   "name": "reggaeton",
//   "count": 0
// },
// {
//   "id": 40,
//   "name": "salsa",
//   "count": 0
// },
// {
//   "id": 41,
//   "name": "trip hop",
//   "count": 0
// },
// {
//   "id": 42,
//   "name": "dream pop",
//   "count": 0
// },
// {
//   "id": 43,
//   "name": "grime",
//   "count": 0
// },
// {
//   "id": 44,
//   "name": "shoegazing",
//   "count": 0
// },
// {
//   "id": 45,
//   "name": "nu metal",
//   "count": 0
// },
// {
//   "id": 46,
//   "name": "post rock",
//   "count": 0
// },
// {
//   "id": 47,
//   "name": "k-pop",
//   "count": 2
// },
// {
//   "id": 48,
//   "name": "celtic",
//   "count": 0
// },
// {
//   "id": 49,
//   "name": "chillwave",
//   "count": 0
// },
// {
//   "id": 50,
//   "name": "lo-fi",
//   "count": 0
// }
