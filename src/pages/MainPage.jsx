import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Track } from '../components/Track';
import { db } from '../firebase';

export function MainPage({ userData, userId, genreDescription }) {
  const [tracksData, setTracksData] = useState([]);
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

  return (
    <div className="animate-appear mt-[10px] mb-[200px] mx-auto relative flex justify-center items-center top-[40px]">
      <ul className="grid gap-[30px] mx-auto">
        {sortedData.map((track, index) => (
          <Track track={track} genreDescription={genreDescription} userData={userData} key={index} userId={userId} />
        ))}
      </ul>
    </div>
  );
}
