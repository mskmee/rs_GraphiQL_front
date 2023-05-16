import './App.css';
import { WelcomePage } from '@/pages/WelcomePage/WelcomePage';
import { EditorPage } from '@/pages/EditorPage/EditorPage';
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/Layout/Layout';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeIsUserLogged, changeUserName } from './store/stateSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(changeIsUserLogged(true));
        dispatch(changeUserName(user.displayName ?? 'Unknown'));
      }
    });
  }, [dispatch]);

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
