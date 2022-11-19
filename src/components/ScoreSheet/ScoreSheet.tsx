import React from 'react';
import cx from 'classnames';

import styles from './ScoreSheet.module.scss';

interface ScoreSheetProps {
  playerName: string;
  type: 'primary' | 'secondary' | 'error';
  words: string[];
}

const ScoreSheet = ({ playerName, type, words }: ScoreSheetProps) => {
  return (
    <div className={styles[type]}>
      <h1 className={styles.playerName}>{playerName}</h1>
      <ul className={styles.words}>
        {words.length ? (
          words.map((word, i) => (
            <li key={i} className={styles.word}>
              {(word || '').toUpperCase()}
            </li>
          ))
        ) : (
          <li className={cx(styles.word, styles['word--empty'])}>Henüz kelime yok</li>
        )}
      </ul>
    </div>
  );
};

export default ScoreSheet;
