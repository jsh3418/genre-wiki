import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Track } from '../components/Track';
export function SearchPage({ userData, userId }) {
  const [searchData, setSearchData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, 'tracks'));
      const snapshotData = [];
      if (id) {
        querySnapshot.forEach((doc) => {
          const searchText = id.toLowerCase().replaceAll(' ', '');
          const trackName = doc.data().name.toLowerCase().replaceAll(' ', '');
          const isSearch = trackName.includes(searchText);
          if (isSearch) {
            snapshotData.push(doc.data());
          }
        });
      }
      setSearchData(snapshotData);
    })();
  }, [id]);

  return (
    <div>
      <div>전체 {searchData.length} 개</div>
      {id ? (
        searchData.map((track, index) => {
          return <Track track={track} userData={userData} key={index} userId={userId} />;
        })
      ) : (
        <>
          <div>검색 결과 없음</div>
          <button
            onClick={() => {
              alert('hi');
            }}
          >
            노래 추가 하기
          </button>
        </>
      )}
    </div>
  );
}
