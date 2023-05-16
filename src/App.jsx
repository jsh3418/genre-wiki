import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { SearchPage } from './pages/SearchPage';
import { Header } from './components/Header';

export function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />}>
          <Route path="/search/:id" element={<SearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
