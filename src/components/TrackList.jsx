import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { GenreDetail } from './GenreDetails';
import { TrackInfo } from './TrackInfo';

export function TrackList({ data, userId }) {
  const sortedData = data.sort((a, b) => b.totalCount - a.totalCount);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (userId) {
      const ref = doc(db, 'users', userId);

      (async () => {
        const querySnapshot = await getDoc(ref);
        const querySnapshotData = querySnapshot.data();

        setUserData(querySnapshotData);
      })();
    }
  }, [userId]);

  return (
    <div className="mt-[10px] mb-[200px] mx-auto relative flex justify-center items-center top-[40px]">
      <ul className="grid gap-[30px] mx-auto">
        {sortedData.map((track, index) => (
          <Track track={track} userData={userData} key={index} userId={userId} />
        ))}
      </ul>
    </div>
  );
}

function Track({ track, userData, index, userId }) {
  const [isHidden, setIsHidden] = useState(true);
  const [genreList, setGenreList] = useState(track.genre);

  const userVotedGenres = [];
  if (userData.votedGenre && track.id in userData.votedGenre) {
    userVotedGenres.push(...userData.votedGenre[track.id]);
  }

  const handleSeeMoreClick = () => {
    setIsHidden(!isHidden);
  };

  const handleGenreButtonClick = (name) => {
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
    updateGenreCount(genreList);
    updateUserData(isVoted, name);
  };

  const updateGenreCount = (genreList) => {
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
      if (newUserData.votedGenre[track.id].length === 1) {
        delete newUserData.votedGenre[track.id];
      } else {
        newUserData.votedGenre[track.id] = newUserData.votedGenre[track.id].filter((genre) => genre !== name);
      }
    } else {
      if (newUserData.votedGenre.hasOwnProperty(track.id)) {
        newUserData.votedGenre[track.id].push(name);
      } else {
        newUserData.votedGenre[track.id] = [name];
      }
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
  const [isSelected, setIsSelected] = useState(voted);
  const handleGenreButtonClick = () => {
    setIsSelected(!isSelected);
    clickEventHandler(name);
  };

  return (
    <button
      key={index}
      onClick={handleGenreButtonClick}
      className={`flex justify-center text-[15px] w-[100px]
      hover:scale-[113%] transition duration-[300]
      border-[1px] rounded-[25px] border-[#243c5a] ${isSelected ? 'bg-[#FFFF64]' : 'bg-[white]'}`}
    >
      {name}
    </button>
  );
}
