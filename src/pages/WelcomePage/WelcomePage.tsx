import { useAppSelector } from '@/hooks/useRedux';
import { Info } from './Info';
import styles from './WelcomePage.module.css';

import bgImage from '@/assets/images/graphiQL-bg.jpg';
import arrowImage from '@/assets/images/arrow.png';

export const WelcomePage = () => {
  const isLogged = useAppSelector((state) => state.userState.isUserLogged);

  return (
    <div className={styles.wrapper}>
      <img className={styles.bgImage} src={bgImage} alt="Image" draggable="false" />
      <img
        className={styles.arrowImage}
        src={arrowImage}
        alt="Arrow"
        draggable="false"
        style={
          isLogged
            ? { transform: 'rotate(30deg)   translateY(1rem)' }
            : { transform: 'rotate(210deg)' }
        }
      />
      <Info />
    </div>
  );
};
