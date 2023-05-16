import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { SearchPage } from './pages/SearchPage';
import { Header } from './components/Header';
import { AuthPage } from './pages/AuthPage';

export function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />}>
          <Route path="/search/:id" element={<SearchPage />} />
        </Route>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/sign-up" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}
