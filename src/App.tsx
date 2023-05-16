import './App.css';
import { WelcomePage } from '@/pages/WelcomePage/WelcomePage';
import { EditorPage } from '@/pages/EditorPage/EditorPage';
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/Layout/Layout';
import { useAppSelector } from './hooks/useRedux';

function App() {
  const isLogged = useAppSelector((state) => state.userState.isUserLogged);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path="/editor" element={isLogged ? <EditorPage /> : <Navigate to="/" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
