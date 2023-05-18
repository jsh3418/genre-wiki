import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { TrackInfo } from '../components/TrackInfo';
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
  }, [userId]);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, 'tracks'));
      const votedTracks = [];

      querySnapshot.forEach((doc) => {
        const trackId = doc.data().id;
        if (userData.votedGenre && userData.votedGenre[trackId]) {
          votedTracks.push(doc.data());
        }
      });

      setTrackData(votedTracks);
    })();
  }, [trackData]);

  return <>{userData.votedGenre && <MyVote votedGenre={userData.votedGenre} votedTrack={trackData} />}</>;
}

function MyVote({ votedGenre, votedTrack }) {
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
        {votedTrack.map((track, index) => (
          <div>
            <TrackInfo track={track} key={index} />
          </div>
        ))}
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
