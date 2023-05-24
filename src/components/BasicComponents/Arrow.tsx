import { useState } from 'react';
import styles from './Arrow.module.css';
import classNames from 'classnames';

interface IArrowProps {
  onClickHandler: () => void;
  className?: string;
}
export const Arrow = ({ onClickHandler, className }: IArrowProps) => {
  const [isToggled, setIsToggled] = useState(false);
  const toggleArrow = () => {
    setIsToggled((prev) => !prev);
    onClickHandler();
  };
  return (
    <button
      className={classNames(styles.btn, className, { [styles.toggle]: isToggled })}
      onClick={toggleArrow}
    >
      <svg height="1em" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>chevron down icon</title>
        <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5"></path>
      </svg>
    </button>
  );
};
