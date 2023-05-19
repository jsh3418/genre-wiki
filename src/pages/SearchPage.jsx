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
      <div className="relative mt-[10px] mb-[200px] mx-auto relative flex justify-center items-center top-[40px]">
        <div className="absolute italic left-[275px] top-[-50px] text-[18px] font-[300]">Total {searchData.length}</div>
        <ul className="grid gap-[30px] mx-auto">
          {searchData.length !== 0 ? (
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
        </ul>
        //{' '}
      </div>
    </div>
    //   <div className="mt-[10px] mb-[200px] mx-auto relative flex justify-center items-center top-[40px]">
    //   <ul className="grid gap-[30px] mx-auto">
    //     {sortedData.map((track, index) => (
    //       <Track track={track} userData={userData} key={index} userId={userId} />
    //     ))}
    //   </ul>
    // </div>
  );
}
