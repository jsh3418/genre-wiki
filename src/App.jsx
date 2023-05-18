import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { SearchPage } from './pages/SearchPage';
import { Header } from './components/Header';
import { AuthPage } from './pages/AuthPage';
import { useEffect, useState } from 'react';

export function App() {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('userId') ?? '';

    setUserId(id);
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage userId={userId} />} />
        <Route path="/search" element={<SearchPage />}>
          <Route path="/search/:id" element={<SearchPage />} />
        </Route>
        <Route path="/login" element={<AuthPage setUserId={setUserId} />} />
        <Route path="/sign-up" element={<AuthPage setUserId={setUserId} />} />
      </Routes>
    </BrowserRouter>
  );
}
