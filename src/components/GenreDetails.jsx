import { useEffect, useState } from 'react';

export function GenreDetail({ genre, isHidden }) {
  const [recommend, setRecommend] = useState(0);

  return (
    <div
      className={`flex mx-auto w-full justify-around items-center overflow-hidden transition-all duration-500 ease-in-out ${
        isHidden ? 'h-0' : 'h-24'
      }`}
      style={{ maxHeight: isHidden ? '0' : '100%' }}
    >
      <GenreProsCons name={genre.name} pros={genre.prosPercent} cons={genre.consPercent} isHidden={isHidden} />
      <UserComment comment={genre.bestComment} />
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

function GenreProsCons({ name, pros, cons, isHidden }) {
  const total = pros + cons;
  const prosWidth = `calc(${(pros / total) * 100}%)`;
  const consWidth = `calc(${(cons / total) * 100}%)`;

  const [prosStyleWidth, setProsStyleWidth] = useState(isHidden ? '0' : prosWidth);
  const [consStyleWidth, setConsStyleWidth] = useState(isHidden ? '0' : consWidth);

  useEffect(() => {
    if (isHidden) {
      setProsStyleWidth('0');
      setConsStyleWidth('0');
    } else {
      const timer = setTimeout(() => {
        setProsStyleWidth(prosWidth);
        setConsStyleWidth(consWidth);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isHidden, prosWidth, consWidth]);

  return (
    <div className="flex-col items-center w-[100px]">
      <span className="flex justify-center font-semibold">{name}</span>
      <div className="flex w-[100px] border-[1.4px] border-[#dbdbdb] bg-[dbdbdb] h-8">
        <div
          style={{ width: consStyleWidth }}
          className={`h-full bg-[#ffffa5] transition-all duration-500 ease-in-out`}
        ></div>

        {/* <div
          style={{ width: prosStyleWidth }}
          className={`h-full bg-[#dbdbdb] transition-all duration-500 ease-in-out`}
        ></div> */}
      </div>
    </div>
  );
}
