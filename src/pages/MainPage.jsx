import { useEffect, useState } from 'react';
import { TrackList } from '../components/TrackList';
import { firebaseApp } from '../firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

export function MainPage({ userId }) {
  const [data, setData] = useState([]);
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, 'tracks'));
      const tempArr = [];

      querySnapshot.forEach((doc) => {
        tempArr.push(doc.data());
      });

      setData(tempArr);
    })();
  }, []);

  return <main>{<TrackList data={data} userId={userId} />}</main>;
}
