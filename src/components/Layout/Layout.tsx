import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';

export const Layout = () => {
  return (
    <main>
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
  );
};
