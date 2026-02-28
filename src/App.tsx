import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';

import HomePage from './pages/HomePage';
import NotesList from './pages/NotesList';
import NotePage from './pages/NotePage';
import BlogList from './pages/BlogList';
import BlogPage from './pages/BlogPage';
import YouTubeList from './pages/YouTubeList';
import YouTubePage from './pages/YouTubePage';

function App() {
  return (
    <BrowserRouter basename="/">
      <Navigation>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notes" element={<NotesList />} />
          <Route path="/notes/:slug" element={<NotePage />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPage />} />
          <Route path="/youtube" element={<YouTubeList />} />
          <Route path="/youtube/:id" element={<YouTubePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Navigation>
    </BrowserRouter>
  );
}

export default App;
