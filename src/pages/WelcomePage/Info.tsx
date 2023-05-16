import styles from './Info.module.css';
import rsLogo from '@/assets/images/rs-logo.png';
import { Authors } from './Authors';
import { useAppSelector } from '@/hooks/useRedux';
import { Button } from '@/components/BasicComponents';
import { NavLink } from 'react-router-dom';

export const Info = () => {
  const isLogged = useAppSelector((state) => state.userState.isUserLogged);

  return (
    <div className={styles.info}>
      {!isLogged && (
        <div className={styles.about}>
          GraphiQL is the GraphQL integrated development environment (IDE).It’s a powerful (and
          all-around awesome) tool you’ll use often while building websites. It offers syntax
          highlighting, intellisense autocompletion, automatic documentation, and much more.
        </div>
      )}
      {isLogged && (
        <div className={styles.about}>
          <p>Use GraphiQL to interactively build your page and static queries. </p>
          <p>Get started!</p>
          <NavLink to={'/editor'}>
            <Button type="button">Go to editor</Button>
          </NavLink>
        </div>
      )}
      <Authors />
      <div className={styles.sponsors}>
        <p>Sponsored by</p>
        <a href="https://rs.school/" target="_blank" rel="noreferrer">
          <img className={styles.rsImage} src={rsLogo} alt="The Rolling Scopes School" />
        </a>
      </div>
    </div>
  );
};
