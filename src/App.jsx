import HomePage from './pages/Home';
import DetailPage from './pages/Detail';
import NotFound from './pages/NotFound';
import AboutPage from './pages/About';
import Layout from './components/Layout';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SearchProvider } from './context/SearchContext';
import './index.css';
import BookmarkPage from './pages/Bookmark';
import { useEffect } from 'react';


export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (!document.startViewTransition) return;

    const originalScrollTo = window.scrollTo;
    document.startViewTransition(() => {
      // biar halaman otomatis ke atas saat transisi
      originalScrollTo(0, 0);
    });
  }, [location.pathname]);
  return (
    <SearchProvider>
      
        <Layout>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/resep/:id" element={<DetailPage />} />
            <Route path="/bookmark" element={<BookmarkPage />} />
            <Route path="/about" element={<AboutPage />} /> 
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
    </SearchProvider>
  );
}
