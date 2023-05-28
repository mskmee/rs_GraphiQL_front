import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

import 'react-toastify/ReactToastify.min.css';
import { useAppSelector } from '@/hooks/useRedux';

export const Layout = () => {
  const isUserLogged = useAppSelector((state) => state.userState.isUserLogged);

  return (
    <>
      <Header isUserLogged={isUserLogged} />
      <main className={styles.main}>
        <Outlet />
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          newestOnTop={true}
          hideProgressBar={false}
          pauseOnFocusLoss
          draggable
        />
      </main>
      <Footer />
    </>
  );
};
