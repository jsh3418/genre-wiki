import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';

export function MyPage({ userId }) {
  const [userData, setUserData] = useState({});
  const [trackData, setTrackData] = useState([]);

  useEffect(() => {
    if (userId) {
      const ref = doc(db, 'users', userId);
      (async () => {
        const querySnapshot = await getDoc(ref);
        const querySnapshotData = querySnapshot.data();

        setUserData(querySnapshotData);
      })();
    }
  }, []);

  return <>{userData.votedGenre && <MyVote votedGenre={userData.votedGenre} />}</>;
}

function MyVote({ votedGenre }) {
  const userGenre = {};

  for (const [trackId, genres] of Object.entries(votedGenre)) {
    genres.forEach((genre) => (userGenre[genre] ? (userGenre[genre] += 1) : (userGenre[genre] = 1)));
  }

  return (
    <>
      <div>
        <div>내가 투표한 장르들 순위 보여주기</div>
        {Object.entries(userGenre).map(([name, count], index) => (
          <MyGenres name={name} count={count} key={index} />
        ))}
      </div>
      <div>
        <h1>내가 장르 투표한 트랙 리스트</h1>
      </div>
    </>
  );
}

function MyGenres({ name, count }) {
  return (
    <div>
      <h1>{name}</h1>
      <h2>{count}</h2>
    </div>
  );
}
