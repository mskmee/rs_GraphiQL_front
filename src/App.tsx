import { useAuthListener } from './hooks/useAuthListener';
import { Navigate, Route, Routes } from 'react-router-dom';
import { WelcomePage, EditorPage, NotFoundPage, AuthPage } from '@/pages';
import { Layout } from '@/components/Layout/Layout';

import './App.css';

function App() {
  const isLogged = useAuthListener();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path="/auth" element={isLogged ? <Navigate to="/" /> : <AuthPage />} />
        <Route path="/editor" element={isLogged ? <EditorPage /> : <Navigate to="/" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
