import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { Track } from '../components/Track';

export function MainPage({ userId }) {
  const [tracksData, setTracksData] = useState([]);
  const [userData, setUserData] = useState({});
  const sortedData = tracksData.sort((a, b) => b.totalCount - a.totalCount);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, 'tracks'));
      const snapshotData = [];

      querySnapshot.forEach((doc) => {
        snapshotData.push(doc.data());
      });

      setTracksData(snapshotData);
    })();
  }, []);

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
