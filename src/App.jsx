import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { db } from './firebase';
import { AuthPage } from './pages/AuthPage';
import { MainPage } from './pages/MainPage';
import { MyPage } from './pages/MyPage';
import { SearchPage } from './pages/SearchPage';

export function App() {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState({});
  const [genreDescription, setGenreDescription] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem('userId') ?? '';

    setUserId(id);
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

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, 'genre'));
      const snapshotData = [];

      querySnapshot.forEach((doc) => {
        snapshotData.push(doc.data());
      });

      setGenreDescription(snapshotData[0]?.data);
    })();
  }, []);

  const makeGenreDescriptions = () => {
    const genreDescriptions = {};
    genreDescription.forEach((item) => {
      genreDescriptions[item.genre] = item.description;
    });
    return genreDescriptions;
  };
  const genreDescriptions = makeGenreDescriptions();

  return (
    <BrowserRouter>
      <Header setUserId={setUserId} setUserData={setUserData} />
      <Routes>
        <Route
          path="/"
          element={<MainPage userData={userData} userId={userId} genreDescription={genreDescriptions} />}
        />
        <Route
          path="/search"
          element={<SearchPage userData={userData} userId={userId} genreDescription={genreDescriptions} />}
        >
          <Route path="/search/:id" element={<SearchPage />} />
        </Route>
        <Route path="/login" element={<AuthPage setUserId={setUserId} />} />
        <Route path="/sign-up" element={<AuthPage setUserId={setUserId} />} />
        <Route path="/my-page" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
