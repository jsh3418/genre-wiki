import { useEffect, useState } from 'react';

export function GenreDetail({ genreList, isHidden, total }) {
  return (
    <div
      className={`flex mx-auto w-full justify-around items-center overflow-hidden transition-all duration-500 ease-in-out ${
        isHidden ? 'h-0' : 'h-[90px]'
      }`}
      style={{ maxHeight: isHidden ? '0' : '100%' }}
    >
      <GenreProsCons name={genreList.name} cons={genreList.count} isHidden={isHidden} total={total} />
    </div>
  );
}

function GenreProsCons({ name, cons, isHidden, total }) {
  const consWidth = `calc(${(cons / total) * 100}%)`;
  const [consStyleWidth, setConsStyleWidth] = useState(isHidden ? '0' : consWidth);
  const consPercent = ((cons / total) * 100).toFixed(0) + '%';

  useEffect(() => {
    if (isHidden) {
      setConsStyleWidth('0');

      return;
    }

    setTimeout(() => {
      setConsStyleWidth(consWidth);
    }, 500);
  }, [isHidden, consWidth]);

  return (
    <div className="flex">
      <div className="flex flex-col items-start justify-center px-[15px] my-[5px]  w-[180px]">
        <span className="flex justify-start font-[500]">{name}</span>
        <div
          className={`flex justify-between items-center w-[150px] 
        border-[#6d6d6d]  rounded-[6px] h-8 hover:scale-[115%] transition duration-[300]
        overflow-hidden border-[1.2px]`}
        >
          <div
            style={{ width: consStyleWidth }}
            className={`h-full bg-[#ffffa5] transition-all duration-500 ease-in-out`}
          ></div>
          <div className="relative right-[10px] italic  font-[500]">{consPercent}</div>
        </div>
        <div className="cons-num italic flex justify-center relative text-[#595959] mt-[4px] items-center text-[12px]">
          {cons}
        </div>
      </div>
      <div className="mx-auto w-[470px] pt-[24px] font-[200] text-[15px] py-[20px] px-[15px]">
        deep house는 느린 4/4 박자 리듬과 재즈 영향을 받은 멜로디를 특징으로 합니다."
      </div>
    </div>
  );
}
