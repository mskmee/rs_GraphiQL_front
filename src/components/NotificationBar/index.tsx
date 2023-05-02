import React, { useState } from 'react';
import { Icon } from './components/Icon';
import styles from './NotificationBar.module.css';
import { NotificationTypes } from '@/types/type/NotificationTypes';
import classNames from 'classnames';

interface INotificationBar {
  type: NotificationTypes;
  timeAlive: number;
  error: Error;
  iconColor?: string;
}
export const NotificationBar = ({ error, type, iconColor, timeAlive }: INotificationBar) => {
  const [isActive, setIsActive] = useState(false);
  const [isDeActive, setIsDeActive] = useState(false);
  const onClose = () => {};
  return (
    <div
      className={classNames(
        styles.wrapper,
        { [styles.wrapperActive]: isActive },
        { [styles.wrapperDeActive]: isDeActive }
      )}
    >
      <div className={styles.iconWrapper}>
        <Icon type={type} color={iconColor} />
      </div>
      <p className={styles.message}>{error.message}</p>
      <span onClick={onClose}>X</span>
    </div>
  );
};
