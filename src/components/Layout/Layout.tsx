import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

export const Layout = () => {
  return (
    <>
      <Header />
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
