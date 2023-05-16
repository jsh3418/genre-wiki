import { useState } from 'react';

export function GenreDetail({ genre, isHidden }) {
  const [recommend, setRecommend] = useState(0);

  return (
    <div
      className={`flex mx-auto w-full justify-around items-center overflow-hidden transition-all duration-500 ease-in-out ${
        isHidden ? 'h-0' : 'h-24'
      }`}
      style={{ maxHeight: isHidden ? '0' : '100%' }}
    >
      <GenreProsCons name={genre.name} pros={genre.prosPercent} cons={genre.consPercent} />
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

function GenreProsCons({ name, pros, cons }) {
  const total = pros + cons;
  const prosWidth = `calc(${(pros / total) * 100}%)`;
  const consWidth = `calc(${(cons / total) * 100}%)`;

  return (
    <div className="flex-col items-center w-[100px]">
      <span className="flex justify-center font-semibold">{name}</span>
      <div className="flex w-[100px] h-8">
        <div style={{ width: consWidth }} className={`h-full bg-[#ffffa5]`}></div>
        <div style={{ width: prosWidth }} className={`h-full bg-[#dbdbdb]`}></div>
      </div>
    </div>
  );
}
