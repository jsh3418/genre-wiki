import { useState } from 'react';

export function GenreDetail({ genre, isHidden }) {
  const [recommend, setRecommend] = useState(0);

  return (
    <div className={`flex h-24 mx-auto w-full justify-around items-center ${isHidden ? 'hidden' : ''}`}>
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
        <div style={{ width: consWidth }} className={`h-full bg-red-400`}></div>
        <div style={{ width: prosWidth }} className={`h-full bg-blue-400`}></div>
      </div>
    </div>
  );
}
