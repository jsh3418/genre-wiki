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
      <div className="animate-appear relative mt-[10px] mb-[200px] mx-auto relative flex flex-col justify-center items-center top-[40px]">
        <ul className="relative grid gap-[30px] mx-auto">
          {searchData.length > 0 ? (
            searchData.map((track, index) => {
              return (
                <>
                  <div className="animate-appear absolute italic font-[200] text-[20px] left-[30px] top-[-50px]">
                    Total {searchData.length}{' '}
                  </div>
                  <Track
                    track={track}
                    genreDescription={genreDescription}
                    userData={userData}
                    key={index}
                    userId={userId}
                  />
                </>
              );
            })
          ) : (
            <>
              <div>
                <div>검색 결과 없음</div>
              </div>
              <Modal />
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
