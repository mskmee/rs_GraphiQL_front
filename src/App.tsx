import './App.css';
import { WelcomePage } from '@/pages/WelcomePage/WelcomePage';
import { EditorPage } from '@/pages/EditorPage/EditorPage';
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout/Layout';
import { useAppSelector } from './hooks/useRedux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeIsUserLogged, changeUserName } from './store/userSlice';

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
      navigate('/');
    });
  }, [dispatch, navigate]);

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
