import { useEffect, useState } from 'react';

export function GenreDetail({ genreList, description, isHidden, total }) {
  return (
    <div
      className={`flex mx-auto w-full justify-around items-center overflow-hidden transition-all duration-500 ease-in-out ${
        isHidden ? 'h-0' : 'h-[90px]'
      }`}
      style={{ maxHeight: isHidden ? '0' : '100%' }}
    >
      <GenreProsCons
        name={genreList.name}
        description={description}
        cons={genreList.count}
        isHidden={isHidden}
        total={total}
      />
    </div>
  );
}

function GenreProsCons({ name, description, cons, isHidden, total }) {
  const divideValue = cons / total || 0;
  const consWidth = `calc(${divideValue * 100}%)`;
  const [consStyleWidth, setConsStyleWidth] = useState(isHidden ? '0' : consWidth);
  const consPercent = (divideValue * 100).toFixed(0) + '%';

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
        <span className="flex justify-start italic text-[16px] font-[500]">{name}</span>
        <div
          className={`flex relative justify-between items-center w-[150px] 
        border-[#878787]  rounded-[6px] h-8 hover:scale-[115%] transition duration-[300]
        overflow-hidden border-[1.2px]`}
        >
          <div
            style={{ width: consStyleWidth }}
            className={`h-full bg-[#ffffa5] transition-all duration-500 ease-in-out`}
          ></div>
          <div className="absolute right-[10px] italic  font-[500]">{consPercent}</div>
        </div>
        <div className="cons-num italic flex justify-center relative text-[#595959] mt-[4px] items-center text-[12px]">
          {`${cons} votes`}
        </div>
      </div>
      <div className="mx-auto w-[470px] pt-[24px] font-[300] text-[15px] py-[20px] px-[15px]">{description}</div>
    </div>
  );
}
