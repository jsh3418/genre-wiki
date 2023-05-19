import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Track } from '../components/Track';
import { db } from '../firebase';
import { Modal } from '../components/Modal';
export function SearchPage({ userData, userId, genreDescription }) {
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
      <div className="relative mt-[10px] mb-[200px] mx-auto relative flex flex-col justify-center items-center top-[40px]">
        <ul className="grid gap-[30px] mx-auto">
          <div className="animate-appear absolute italic font-[200] text-[20px] left-[350px] top-[-50px]">
            Total {searchData.length}{' '}
          </div>
          {searchData.length > 0 ? (
            searchData.map((track, index) => {
              return (
                <Track
                  track={track}
                  genreDescription={genreDescription}
                  userData={userData}
                  key={index}
                  userId={userId}
                />
              );
            })
          ) : (
            <>
              <div>검색 결과 없음</div>
              <Modal />
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
