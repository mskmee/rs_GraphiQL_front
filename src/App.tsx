import './App.css';
import {
  WelcomePage,
  EditorPage,
  NotFoundPage,
  LoginPage,
  RegistrationPage,
  ResetPasswordPage,
} from '@/pages';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/Layout/Layout';
import { useAppSelector } from './hooks/useRedux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeIsUserLogged, changeUserName } from './store/userSlice';
import { WithIsLogged } from './components/WithIsLogged';

function App() {
  const isLogged = useAppSelector((state) => state.userState.isUserLogged);

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
        <Route path="/login" element={<WithIsLogged isLogged={isLogged} Component={LoginPage} />} />
        <Route
          path="/registration"
          element={<WithIsLogged isLogged={isLogged} Component={RegistrationPage} />}
        />
        <Route
          path="/reset"
          element={<WithIsLogged isLogged={isLogged} Component={ResetPasswordPage} />}
        />
        <Route path="/editor" element={isLogged ? <EditorPage /> : <Navigate to="/" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
