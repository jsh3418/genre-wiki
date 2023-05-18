import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { AuthPage } from './pages/AuthPage';
import { MainPage } from './pages/MainPage';
import { MyPage } from './pages/MyPage';
import { SearchPage } from './pages/SearchPage';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export function App() {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState({});

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

  return (
    <BrowserRouter>
      <Header setUserId={setUserId} setUserData={setUserData} />
      <Routes>
        <Route path="/" element={<MainPage userData={userData} userId={userId} />} />
        <Route path="/search" element={<SearchPage />}>
          <Route path="/search/:id" element={<SearchPage />} />
        </Route>
        <Route path="/login" element={<AuthPage setUserId={setUserId} />} />
        <Route path="/sign-up" element={<AuthPage setUserId={setUserId} />} />
        <Route path="/my-page" element={<MyPage userId={userId} />} />
      </Routes>
    </BrowserRouter>
  );
}
