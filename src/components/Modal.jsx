import React, { useRef, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { getTrackData } from '../API/getTrackData';

export function Modal() {
  const [artist, setArtist] = useState('');
  const [track, setTrack] = useState('');
  const [tracksData, setTracksData] = useState([]);
  const dialog = useRef();

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
  };

  return (
    <>
      <button onClick={openDialog}>노래 추가 하기</button>
      <dialog ref={dialog}>
        <h2>노래 추가</h2>
        artist: <input type="text" onChange={(event) => setArtist(event.target.value)} value={artist} />
        track : <input type="text" onChange={(event) => setTrack(event.target.value)} value={track} />
        <button onClick={addTrack}>Add</button>
        <button onClick={closeDialog}>Close</button>
      </dialog>
    </>
  );
}
