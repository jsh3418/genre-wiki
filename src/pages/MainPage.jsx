import { useEffect, useState } from 'react';
import { TrackList } from '../components/TrackList';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export function MainPage({ userId }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, 'tracks'));
      const snapshotData = [];

      querySnapshot.forEach((doc) => {
        snapshotData.push(doc.data());
      });

      setData(snapshotData);
    })();
  }, []);

  return <main>{<TrackList data={data} userId={userId} />}</main>;
}
