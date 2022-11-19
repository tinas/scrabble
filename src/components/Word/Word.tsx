import React from 'react';

import Letter from '../Letter';

import styles from './Word.module.scss';

interface WordProps {
  word: string;
  type: 'primary' | 'secondary' | 'error';
  isUpperCase?: boolean;
}

const Word = ({ word, type, isUpperCase = true }: WordProps) => {
  const formatWord = isUpperCase ? word.toUpperCase() : word;

  return (
    <div className={styles.wrapper}>
      {formatWord.split('').map((letter, i) => (
        <Letter key={i} type={type} letter={letter} />
      ))}
    </div>
  );
};

export default Word;
