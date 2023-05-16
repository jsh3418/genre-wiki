export function LoginPage() {
  return (
    <div className="flex flex-col justify-center; px-[35px] py-[20px] w-[450px] h-[500px] font-[500] mx-auto border-[1px]">
      <div className="mx-[50px] my-[10px] text-[20px] text-center">로그인</div>
      <div className="mx-auto w-[350px] my-[10px] w-[50px]">이메일</div>
      <input className="mx-auto px-[15px] w-[350px] h-[50px] my-[10px] border-[1px]" placeholder="이메일" />
      <div className="mx-auto w-[350px] my-[10px] w-[50px]">비밀번호</div>
      <input className="mx-auto px-[15px] w-[350px] h-[50px] my-[10px] border-[1px]" placeholder="비밀번호" />
      <button className="mt-[30px] mx-auto w-[350px] h-[50px] bg-[#FFFF64] font-[700]">로그인</button>
    </div>
  );
}
