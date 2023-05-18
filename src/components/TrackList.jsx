import { doc, getFirestore, updateDoc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firebaseApp } from '../firebase';
import { GenreDetail } from './GenreDetails';

export function TrackList({ data, userId }) {
  const sorted = data.sort((a, b) => b.totalCount - a.totalCount);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (userId) {
      const db = getFirestore(firebaseApp);
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
        {sorted.map((track, index) => (
          <Track track={track} userData={userData} key={index} userId={userId} />
        ))}
      </ul>
    </div>
  );
}

function Track({ track, userData, index, userId }) {
  const arr = [];
  if (userData.votedGenre && track.id in userData.votedGenre) {
    arr.push(...userData.votedGenre[track.id]);
  }

  const [isHidden, setIsHidden] = useState(true);
  const [genreList, setGenreList] = useState(track.genre);
  const handleClick = () => {
    setIsHidden((prev) => !prev);
  };

  const handleGenreButtonClick = (name) => {
    const isVoted = checkVotedGenre(userData.votedGenre[track.id], name);

    const temp = genreList.map((item) => {
      if (item.name === name) {
        if (isVoted) {
          item.count--;
          track.totalCount--;
        } else {
          item.count++;
          track.totalCount++;
        }
      }
      return item;
    });
    setGenreList(temp);

    const db = getFirestore(firebaseApp);
    const tracksRef = doc(db, 'tracks', track.id);
    updateDoc(tracksRef, {
      genre: [...genreList],
      totalCount: track.totalCount,
    });

    const usersRef = doc(db, 'users', userId);
    const newUserData = Object.assign(userData);
    console.log(newUserData);
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
      <button className={`flex relative ${isHidden ? 'overflow-hidden' : ''}`}>
        <img className="w-[150px] h-[150px]" src={track.image} alt={track.name} />
        <div className="justify-center items-center flex flex-col w-[150px] h-[150px]">
          <button className="text-[14px]">{track.artist}</button>
          <button className="text-[18px]">{track.name}</button>
        </div>
        <div className="flex justify-center py-[35px] items-center gap-[12px]  p-5 h-[130px] w-[400px] flex-wrap">
          {sortedGenre.map((name, i) => (
            <GenreButton
              name={name}
              key={i}
              clickEventHandler={handleGenreButtonClick}
              voted={arr.find((element) => element === name)}
            />
          ))}
        </div>
        <button
          onClick={handleClick}
          className="absolute text-[black] text-[13px]
          right-[18px] bottom-[15px] w-[50px] h-[20px] font-[500]  "
          type="button"
        >
          {isHidden ? '더보기' : '접기'}
        </button>
      </button>
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
        {/* <div className="flex p-[20px]"> */}
        <div className={`detail-list  mt-${isHidden ? '' : '[30px]'}`}>
          {genreList.map((data, index) => {
            return <GenreDetail isHidden={isHidden} genreList={data} key={index} total={track.totalCount} />;
          })}
        </div>
        {/* </div> */}
      </div>
    </li>
  );
}

function GenreButton({ name, index, clickEventHandler, voted }) {
  const [isSelected, setIsSelected] = useState(voted);
  const handleClick = (e) => {
    setIsSelected((prev) => !prev);
    clickEventHandler(name);
  };

  return (
    <button
      key={index}
      onClick={handleClick}
      className={`flex justify-center text-[15px] w-[100px]
      hover:scale-[113%] transition duration-[300]
      border-[1px] rounded-[25px] border-[#243c5a] ${isSelected ? 'bg-[#FFFF64]' : 'bg-[white]'}`}
    >
      {name}
    </button>
  );
}
