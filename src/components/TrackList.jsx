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
    const temp = genreList.map((item) => {
      if (item.name === name) {
        item.count++;
      }
      return item;
    });
    setGenreList(temp);

    const db = getFirestore(firebaseApp);
    const tracksRef = doc(db, 'tracks', track.id);
    updateDoc(tracksRef, {
      genre: [...genreList],
      totalCount: track.totalCount++,
    });

    const usersRef = doc(db, 'users', userId);
    const newUserData = Object.assign(userData);
    if (newUserData.votedGenre.hasOwnProperty(track.id)) {
      newUserData.votedGenre[track.id].push(name);
    } else {
      newUserData.votedGenre[track.id] = [name];
    }

    updateDoc(usersRef, newUserData);
  };

  const sortedGenre = genreList.sort((a, b) => b.count - a.count).map((item) => item.name);

  return (
    <li className="flex-col rounded-[8px] shadow-[0_4px_24px_rgba(48,62,75,.06)]" key={index}>
      <div className="flex relative">
        <img className="w-[150px] h-[150px]" src={track.image} alt={track.name} />
        <div className="justify-center items-center flex flex-col w-[150px] h-[150px]">
          <div className="text-[14px]">{track.artist}</div>
          <div className="text-[18px]">{track.name}</div>
        </div>
        <div className="flex justify-center items-center gap-[5px]  p-5 h-[130px] w-[400px] flex-wrap">
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
      </div>
      <div className="w-full">
        {isHidden ? '' : <div>{track.totalCount}</div>}

        {genreList.map((data, index) => {
          return <GenreDetail isHidden={isHidden} genreList={data} key={index} total={track.totalCount} />;
        })}
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
      className={`flex justify-center text-[15px] w-[100px] border-[1px] rounded-[25px] border-[#243c5a] ${
        isSelected ? 'bg-[#FFFF64]' : 'bg-[white]'
      }`}
    >
      {name}
    </button>
  );
}
