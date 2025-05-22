import HomePage from './pages/Home';
import DetailPage from './pages/Detail';
import Layout from './components/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchProvider } from './context/SearchContext';
import './index.css';
import BookmarkPage from './pages/Bookmark';

const baseUrl = import.meta.env.MODE === 'production' ? '/were-cooked-frontend' : '/';

export default function App() {
  return (
    <SearchProvider>
      <Router basename={baseUrl}>
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
