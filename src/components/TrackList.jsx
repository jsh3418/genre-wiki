import { useState } from 'react';
import { GenreDetail } from './GenreDetails';

export function TrackList({ data }) {
  return (
    <div className="mt-[10px] mx-auto relative flex justify-center items-center top-[40px]">
      <ul className="grid gap-[30px] mx-auto">
        {data.map((track, index) => (
          <Track track={track} key={index} />
        ))}
      </ul>
    </div>
  );
}

function Track({ track, index }) {
  const [isHidden, setIsHidden] = useState(true);
  const handleClick = () => {
    setIsHidden((prev) => !prev);
  };
  const genreData = [
    {
      name: '트로트',
      prosPercent: 25,
      consPercent: 75,
      bestComment: {
        content: '아이브가 트로트가 아니면 무엇이 트로트인가?',
      },
    },
    {
      name: 'genre2',
      prosPercent: 30,
      consPercent: 70,
      bestComment: {
        content: '아이브가 트로트가 아니면 무엇이 트로트인가?',
      },
    },
    {
      name: 'genre3',
      prosPercent: 50,
      consPercent: 50,
      bestComment: {
        content: '아이브가 트로트가 아니면 무엇이 트로트인가?',
      },
    },
    {
      name: 'genre4',
      prosPercent: 45,
      consPercent: 55,
      bestComment: {
        content: '아이브가 트로트가 아니면 무엇이 트로트인가?',
      },
    },
    {
      name: 'genre5',
      prosPercent: 15,
      consPercent: 85,
      bestComment: {
        content: '아이브가 트로트가 아니면 무엇이 트로트인가?',
      },
    },
  ];

  return (
    <li className="flex-col rounded-[8px] shadow-[0_4px_24px_rgba(48,62,75,.06)]" key={index}>
      <div className="flex relative">
        <img className="w-[150px] h-[150px]" src={track.image} alt={track.name} />
        <div className="justify-center items-center flex flex-col w-[150px] h-[150px]">
          <div className="text-[14px]">{track.artist}</div>
          <div className="text-[18px]">{track.name}</div>
        </div>
        <div className="px-[20px] flex flex-col justify-center gap-4">
          <div className="flex justify-center items-center gap-[15px]">
            <div className="flex font-[200] bg-[white] justify-center text-[15px]  w-[80px] border-[1px] rounded-[25px] border-[#243c5a]">
              pop
            </div>
            <div className="flex font-[700] bg-[#FFFF64] justify-center text-[15px]  w-[80px] border-[1px] rounded-[25px] border-[#243c5a]">
              pop
            </div>
          </div>
          <div className="flex justify-center items-center gap-[15px]">
            <div className="flex font-[200] min-w-[100px] whitespace-nowrap justify-center text-[15px]  w-[80px] border-[1px] rounded-[25px] border-[#243c5a]">
              Deep House
            </div>
            <div className="flex font-[200] min-w-[100px] whitespace-nowrap justify-center text-[15px]  w-[80px] border-[1px] rounded-[25px] border-[#243c5a]">
              Acid Jazz
            </div>
            <div className="flex font-[200] min-w-[100px] whitespace-nowrap justify-center text-[15px]  w-[80px] border-[1px] rounded-[25px] border-[#243c5a]">
              UK Garage
            </div>
            <div className="flex font-[200] min-w-[100px] whitespace-nowrap justify-center text-[15px]  w-[80px] border-[1px] rounded-[25px] border-[#243c5a]">
              user
            </div>
            <div className="flex font-[200] min-w-[100px] whitespace-nowrap justify-center text-[15px]  w-[80px] border-[1px] rounded-[25px] border-[#243c5a]">
              user
            </div>
          </div>
        </div>
        <button
          onClick={handleClick}
          className="absolute bottom-1 right-1 h-6 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
          type="button"
        >
          더보기
        </button>
      </div>
      <div className="w-full">
        {genreData.map((data, index) => {
          return <GenreDetail isHidden={isHidden} genre={data} key={index} />;
        })}
      </div>
    </li>
  );
}
