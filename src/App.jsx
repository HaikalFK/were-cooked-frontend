import HomePage from './pages/Home';
import DetailPage from './pages/Detail';
import Layout from './components/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchProvider } from './context/SearchContext';
import './index.css';
import BookmarkPage from './pages/Bookmark';

export default function App() {
  return (
    <SearchProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resep/:id" element={<DetailPage />} />
            <Route path="/bookmark" element={<BookmarkPage />} />
          </Routes>
        </Layout>
      </Router>
    </SearchProvider>
  );
}
