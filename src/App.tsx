import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './hooks/useRedux';
import { changeIsUserLogged, changeUserName } from './store/userSlice';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { WelcomePage, EditorPage, NotFoundPage, AuthPage } from '@/pages';
import { Layout } from '@/components/Layout/Layout';

import './App.css';

function App() {
  const isLogged = useAppSelector((state) => state.userState.isUserLogged);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(changeIsUserLogged(true));
        dispatch(changeUserName(user.displayName ?? 'Unknown'));
        return;
      }
      dispatch(changeIsUserLogged(false));
      dispatch(changeUserName(''));
    });
  }, [dispatch, navigate]);

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
