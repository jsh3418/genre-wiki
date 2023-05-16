import { useState } from 'react';
import { GenreDetail } from './GenreDetails';

export function TrackList({ data }) {
  return (
    <div className="mt-[10px] mb-[200px] mx-auto relative flex justify-center items-center top-[40px]">
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
  const [isEdit, setIsEdit] = useState(false);
  const handleClick = (action) => {
    switch (action) {
      case 'edit':
        setIsEdit((prev) => !prev);
        console.log('된거');
        break;
      case 'more':
        setIsHidden((prev) => !prev);
        break;
      default:
        break;
    }
  };

  const baseGenre = ['k-pop', 'pop', 'dance'];
  const userGenre = ['house', 'deep house', 'Trot', 'user', 'user'];
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
        <div className=" pr-[120px] flex flex-col justify-center">
          <div className="flex justify-center items-center h-[50px] gap-[15px]">
            {baseGenre.map((name, i) => (
              <GenreButton name={name} key={i} isEdit={isEdit} />
            ))}
          </div>
          <div className="flex justify-center items-center h-[50px] gap-[15px]">
            {userGenre.map((name, i) => (
              <GenreButton name={name} key={i} isEdit={isEdit} />
            ))}
          </div>
        </div>
        <button
          onClick={() => handleClick('edit')}
          className="absolute text-[black] text-[13px]
        right-[60px] bottom-[15px] w-[50px] h-[20px] font-[500]  "
        >
          수정
        </button>
        <button
          onClick={() => handleClick('more')}
          className="absolute text-[black] text-[13px]
          right-[18px] bottom-[15px] w-[50px] h-[20px] font-[500]  "
          type="button"
        >
          {isHidden ? '더보기' : '접기'}
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

const genreCountData = [
  {
    id: 1,
    name: 'pop',
    count: 0,
  },
  {
    id: 2,
    name: 'dance',
    count: 0,
  },
  {
    id: 3,
    name: 'k-pop',
    count: 0,
  },
  {
    id: 4,
    name: 'classical',
    count: 0,
  },
  {
    id: 5,
    name: 'hip hop',
    count: 0,
  },
  {
    id: 6,
    name: 'jazz',
    count: 0,
  },
  {
    id: 7,
    name: 'rock',
    count: 0,
  },
];

function GenreButton({ name, index, isEdit }) {
  const [isSelected, setIsSelected] = useState(false);
  const [genreCount, setGenreCount] = useState(genreCountData);
  const handleClick = (e) => {
    const target = e.target;
    const selectGenre = target.textContent;

    setIsSelected((prev) => !prev);
    setGenreCount((prevGenreCount) => {
      console.log(prevGenreCount);
      const updatedGenreCount = [...prevGenreCount]; // 새로운 배열을 복사합니다

      // pop을 찾아 해당 항목의 count 값을 증가시킵니다
      const countingGenre = updatedGenreCount.find((genre) => genre.name === selectGenre);
      if (countingGenre) {
        countingGenre.count += 1;
      }
      console.log(updatedGenreCount);
      return updatedGenreCount; // 업데이트된 배열을 반환합니다
    });
  };
  return (
    <div
      key={index}
      onClick={handleClick}
      className={`flex bg-[white] justify-center text-[15px] w-[100px] border-[1px] rounded-[25px] border-[#243c5a] ${
        isEdit ? 'animate-shake' : ''
      }`}
      style={{ backgroundColor: isSelected ? '#FFFF64' : '', fontWeight: isSelected ? 650 : 200 }}
    >
      {name}
      <button></button>
    </div>
  );
}
