import './App.css';
import { WelcomePage } from '@/components/WelcomePage/WelcomePage';
import { NotFoundPage } from '@/components/NotFoundPage/NotFoundPage';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/Layout/Layout';
import { EditorPage } from '@/components/EditorPage/EditorPage';

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
