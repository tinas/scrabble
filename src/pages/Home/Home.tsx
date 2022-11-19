import React, { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Word, Input, Button } from '../../components';

import styles from './Home.module.scss';

const Home: NextPage = () => {
  const router = useRouter();

  const [playerName, setPlayerName] = useState<string>('');

  const gameUrl = `/Game?player=${playerName == '' ? 'Oyuncu' : playerName}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setPlayerName(e.target.value);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.title}>
          <Word type="secondary" word="KELİME" />
          <Word type="error" word="TÜRETME" />
          <Word type="primary" word="OYUNU" />
        </section>
        <section className={styles.content}>
          <div className={styles.playerName}>
            <Input placeholder="Oyuncu ismi" value={playerName} onChange={handleChange} />
            <Button label="Oyuna başla" onClick={() => router.push(gameUrl)} />
          </div>
          <div className={styles.gamerules}>
            <h3 className={styles['gamerules-heading']}>Oyun Kuralları</h3>
            <ul className={styles['gamerules-list']}>
              <li className={styles['gamerules-list-item']}>
                Kelimenin son harfi ile başlayan yeni bir kelime türetmelisin
              </li>
              <li className={styles['gamerules-list-item']}>Daha önce çıkan kelimeleri tekrar söyleyemezsin</li>
              <li className={styles['gamerules-list-item']}>
                Sekiz saniye içerisinde türettiğin kelimeyi söylemelisin
              </li>
              <li className={styles['gamerules-list-item']}>
                Sıra sana geçtiğinde söylemen yeterli (mikrofon seni dinlemek için açılır)
              </li>
              <li className={styles['gamerules-list-item']}>Oynayabilmek için mikrofon iznini vermen gerekebilir</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
