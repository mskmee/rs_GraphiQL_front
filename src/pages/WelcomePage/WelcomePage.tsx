import { useAppSelector } from '@/hooks/useRedux';
import { Info } from './Info';

import styles from './WelcomePage.module.css';
import arrowImage from '@/assets/images/arrow.png';

export const WelcomePage = () => {
  const isUserLogged = useAppSelector((state) => state.userState.isUserLogged);

  return (
    <div className={styles.wrapper}>
      <Info />
      <img
        className={styles.arrowImage}
        src={arrowImage}
        alt="Arrow"
        draggable="false"
        style={
          isUserLogged
            ? { transform: 'rotate(30deg)   translateY(1rem)' }
            : { transform: 'rotate(210deg)' }
        }
      />
    </div>
  );
};
