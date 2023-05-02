import './App.css';
import { WelcomePage } from '@/pages/WelcomePage/WelcomePage';
import { EditorPage } from '@/pages/EditorPage/EditorPage';
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/Layout/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
