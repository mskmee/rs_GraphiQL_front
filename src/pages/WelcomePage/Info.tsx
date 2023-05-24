import styles from './Info.module.css';
import rsLogo from '@/assets/images/rs-logo.png';
import { Authors } from './Authors';
import { useAppSelector } from '@/hooks/useRedux';
import { Button } from '@/components/BasicComponents';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Info = () => {
  const isLogged = useAppSelector((state) => state.userState.isUserLogged);
  const { t } = useTranslation();

  return (
    <div className={styles.info}>
      {!isLogged && <div className={styles.about}>{t('about.info')}</div>}
      {isLogged && (
        <div className={styles.about}>
          <p>{t('about.loggedInfo')}</p>
          <p>{t('about.start')}</p>
          <NavLink to={'/editor'}>
            <Button type="button" className={styles.editorButton}>
              {t('about.button')}
            </Button>
          </NavLink>
        </div>
      )}
      <Authors />
      <div className={styles.sponsors}>
        <p>{t('sponsored')}</p>
        <a href="https://rs.school/" target="_blank" rel="noreferrer">
          <img className={styles.rsImage} src={rsLogo} alt="The Rolling Scopes School" />
        </a>
      </div>
    </div>
  );
};
