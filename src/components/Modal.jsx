import React, { useRef, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { getTrackData } from '../API/getTrackData';
import { useNavigate } from 'react-router-dom';

export function Modal() {
  const [artist, setArtist] = useState('');
  const [track, setTrack] = useState('');
  const [tracksData, setTracksData] = useState([]);
  const dialog = useRef();
  const navigate = useNavigate();

  (async () => {
    const querySnapshot = await getDocs(collection(db, 'tracks'));
    const snapshotData = [];

    querySnapshot.forEach((doc) => {
      snapshotData.push(doc.data());
    });

    setTracksData(snapshotData);
  })();

  const openDialog = () => {
    dialog.current.showModal();
  };

  const closeDialog = () => {
    setArtist('');
    setTrack('');
    dialog.current.close();
  };

  const addTrack = async () => {
    const newTrackData = await getTrackData(artist, track);
    const isDuplicate = Boolean(tracksData.find((track) => track.id === newTrackData.id));

    if (artist === '' || track === '') {
      alert('artist와 track을 입력해 주세요.');
      return;
    }

    if (isDuplicate) {
      alert('이미 등록된 노래 입니다.');
      return;
    }

    setDoc(doc(db, 'tracks', newTrackData.id), newTrackData);
    closeDialog();
    navigate(`/search/${track}`);
  };

  return (
    <>
      <button onClick={openDialog}>노래 추가 하기</button>
      <dialog ref={dialog} className=" rounded-[5px]">
        <div className="animate-fade-in-out py-[20px] px-[35px] gap-[30px] w-[350px] font-[200] text-[15px] flex flex-col">
          <h2 className="mx-auto text-[17upx] font-[400]">노래 추가</h2>
          <div className="relative mx-auto left-[-15spx] flex gap-[15px]">
            artist{' '}
            <input
              className="font-[100] w-[160px] border-[1px] rounded-[4px]"
              type="text"
              onChange={(event) => setArtist(event.target.value)}
              value={artist}
            />
          </div>
          <div className="relative mx-auto left-[-15spx] flex gap-[15px]">
            track{' '}
            <input
              className="font-[100] w-[160px] border-[1px] rounded-[4px]"
              type="text"
              onChange={(event) => setTrack(event.target.value)}
              value={track}
            />
          </div>
          <div className="flex mx-auto gap-[10px]">
            <button onClick={addTrack} className="font-[700] rounded-[6px] w-[80px] h-[35px] bg-[#ffff87]">
              ADD
            </button>
            <button onClick={closeDialog} className="font-[700] rounded-[6px] w-[80px] h-[35px] bg-[#ffff87]">
              CLOSE
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
