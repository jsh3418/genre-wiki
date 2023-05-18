import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { TrackInfo } from './TrackInfo';
import { GenreDetail } from './GenreDetails';
import { useNavigate } from 'react-router-dom';

export function Track({ track, userData, index, userId }) {
  const [isHidden, setIsHidden] = useState(true);
  const [genreList, setGenreList] = useState(track.genre);
  const navigate = useNavigate();

  useEffect(() => {
    updateGenreCount();
  }, [genreList]);

  const userVotedGenres = [];
  if (userData.votedGenre && track.id in userData.votedGenre) {
    userVotedGenres.push(...userData.votedGenre[track.id]);
  }

  const handleSeeMoreClick = () => {
    setIsHidden(!isHidden);
  };

  const handleGenreButtonClick = (name) => {
    if (!userId) {
      if (confirm('로그인해야 투표할 수 있습니다. 로그인 페이지로 이동하시겠습니까?')) {
        navigate('/login');

        return;
      }

      return;
    }

    const isVoted = checkVotedGenre(userData.votedGenre[track.id], name);

    const newGenreList = genreList.map((item) => {
      if (item.name === name) {
        const increment = isVoted ? -1 : 1;
        item.count += increment;
        track.totalCount += increment;
      }

      return item;
    });

    setGenreList(newGenreList);
    updateUserData(isVoted, name);
  };

  const updateGenreCount = () => {
    const tracksRef = doc(db, 'tracks', track.id);

    updateDoc(tracksRef, {
      genre: [...genreList],
      totalCount: track.totalCount,
    });
  };

  const updateUserData = (isVoted, name) => {
    const usersRef = doc(db, 'users', userId);
    const newUserData = Object.assign(userData);

    if (isVoted) {
      newUserData.votedGenre[track.id] = newUserData.votedGenre[track.id].filter((genre) => genre !== name);

      if (newUserData.votedGenre[track.id].length === 0) {
        delete newUserData.votedGenre[track.id];
      }
    } else if (newUserData.votedGenre.hasOwnProperty(track.id)) {
      newUserData.votedGenre[track.id].push(name);
    } else {
      newUserData.votedGenre[track.id] = [name];
    }

    updateDoc(usersRef, newUserData);
  };

  const checkVotedGenre = (votedGenre, name) => {
    return votedGenre?.includes(name);
  };

  const sortedGenre = genreList.sort((a, b) => b.count - a.count).map((item) => item.name);

  return (
    <li className="flex-col rounded-[8px] shadow-[0_4px_24px_rgba(48,62,75,.06)]" key={index}>
      <div className={`flex relative ${isHidden ? 'overflow-hidden' : ''}`}>
        <TrackInfo track={track} />
        <div className="flex justify-center py-[35px] items-center gap-[12px]  p-5 h-[130px] w-[400px] flex-wrap">
          {sortedGenre.map((name, i) => (
            <GenreButton
              name={name}
              key={i}
              clickEventHandler={handleGenreButtonClick}
              voted={userVotedGenres.find((element) => element === name)}
            />
          ))}
        </div>
        <button
          onClick={handleSeeMoreClick}
          className="absolute text-[black] text-[13px]
          right-[18px] bottom-[15px] w-[50px] h-[20px] font-[500]  "
          type="button"
        >
          {isHidden ? '더보기' : '접기'}
        </button>
      </div>
      <div className={`w-full transition-all duration-500 ease-in-out ${isHidden ? '' : 'mb-[50px]'}`}>
        {isHidden ? (
          ''
        ) : (
          <div
            className="flex relative top-[15px] italic left-[25px] font-[200]
          text-[30px] "
          >
            Total {track.totalCount}
          </div>
        )}
        <div className={`detail-list  mt-${isHidden ? '' : '[30px]'}`}>
          {genreList.map((data, index) => {
            return <GenreDetail isHidden={isHidden} genreList={data} key={index} total={track.totalCount} />;
          })}
        </div>
      </div>
    </li>
  );
}

function GenreButton({ name, index, clickEventHandler, voted }) {
  const handleGenreButtonClick = () => {
    clickEventHandler(name);
  };

  return (
    <button
      key={index}
      onClick={handleGenreButtonClick}
      className={`flex justify-center text-[15px] w-[100px]
      hover:scale-[113%] transition duration-[300]
      border-[1px] rounded-[25px] border-[#243c5a] ${voted ? 'bg-[#FFFF64]' : 'bg-[white]'}`}
    >
      {name}
    </button>
  );
}
