import React from 'react';
import cx from 'classnames';

import styles from './Letter.module.scss';

interface LetterProps {
  letter: string;
  type: 'primary' | 'secondary' | 'error';
}

const Letter = ({ type = 'primary', letter }: LetterProps) => {
  const classNames = cx(styles.container, styles[type]);

  return <div className={classNames}>{letter}</div>;
};

export default Letter;
