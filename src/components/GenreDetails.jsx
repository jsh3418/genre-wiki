import { useEffect, useState } from 'react';

export function GenreDetail({ genreList, isHidden, total }) {
  const [recommend, setRecommend] = useState(0);
  return (
    <div
      className={`flex mx-auto w-full justify-around items-center overflow-hidden transition-all duration-500 ease-in-out ${
        isHidden ? 'h-0' : 'h-24'
      }`}
      style={{ maxHeight: isHidden ? '0' : '100%' }}
    >
      <GenreProsCons name={genreList.name} cons={genreList.count} isHidden={isHidden} total={total} />
    </div>
  );
}

function UserComment({ comment }) {
  return (
    <div>
      <img src="" alt="" />
      <span className="font-extrabold">BEST COMMENT</span>
      <p>{comment.content}</p>
    </div>
  );
}

function GenreProsCons({ name, cons, isHidden, total }) {
  const consWidth = `calc(${(cons / total) * 100}%)`;
  const [consStyleWidth, setConsStyleWidth] = useState(isHidden ? '0' : consWidth);

  useEffect(() => {
    if (isHidden) {
      setConsStyleWidth('0');
    } else {
      const timer = setTimeout(() => {
        setConsStyleWidth(consWidth);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isHidden, consWidth]);

  return (
    <div className="flex-col items-center w-[100px]">
      <span className="flex justify-center font-semibold">{name}</span>
      <div className="flex w-[100px] border-[1.4px] border-[#dbdbdb] bg-[dbdbdb] h-8">
        <div
          style={{ width: consStyleWidth }}
          className={`h-full bg-[#ffffa5] transition-all duration-500 ease-in-out`}
        ></div>
      </div>
      <div>{cons}</div>
    </div>
  );
}
