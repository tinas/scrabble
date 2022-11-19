import React from 'react';
import cx from 'classnames';

import styles from './Button.module.scss';

interface ButtonProps {
  label: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const Button = ({ label, className, onClick }: ButtonProps) => {
  const classNames = cx(styles.primary, className);

  return (
    <button type="button" className={classNames} onClick={onClick}>
      {label}
    </button>
  );
};
