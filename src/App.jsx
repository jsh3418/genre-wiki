import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { AuthPage } from './pages/AuthPage';
import { MainPage } from './pages/MainPage';
import { MyPage } from './pages/MyPage';
import { SearchPage } from './pages/SearchPage';

export function App() {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('userId') ?? '';

    setUserId(id);
  }, []);

  return (
    <BrowserRouter>
      <Header setUserId={setUserId} />
      <Routes>
        <Route path="/" element={<MainPage userId={userId} />} />
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
