import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import sleep from 'sleep-promise';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Button, ScoreSheet, Word } from '../../components';

import names from '../../utils/names.json';
import Microphone from '../../svg/Microphone.svg';
import styles from './Game.module.scss';

const Game: NextPage = () => {
  const router = useRouter();
  const { player } = router.query;

  // NUMBERS
  const [timer, setTimer] = useState<number>(8);
  const [playingStep, setPlayingStep] = useState<number>(0);

  // STRINGS
  const [gameLog, setGameLog] = useState<string>('Bilgisayar Oynuyor');
  const [word, setWord] = useState<string>('');

  // ARRAYS
  const [computerWords, setComputerWords] = useState<string[]>([]);
  const [playerWords, setPlayerWords] = useState<string[]>([]);

  // BOOlEANS
  const [isListening, setListening] = useState<boolean>(false);

  // CUSTOM TYPES
  const [wordType, setWordType] = useState<'primary' | 'secondary' | 'error'>('primary');
  const [roundPlayer, setRoundPlayer] = useState<'computer' | 'player'>('computer');
  const [winner, setWinner] = useState<'computer' | 'player' | null>(null);

  const fallibilityRatio = 30;
  const isGameOver = winner != null;
  const computerScoreSheetType = !isGameOver ? 'primary' : winner == 'computer' ? 'secondary' : 'error';
  const playerScoreSheetType = !isGameOver ? 'primary' : winner == 'player' ? 'secondary' : 'error';

  useEffect(() => {
    goNextRound();
  }, [roundPlayer]);

  useEffect(() => {
    countdown();
  }, [timer, isListening]);

  const countdown = async () => {
    if (!isListening) return;

    await sleep(1000);

    if (timer != 0) return setTimer(timer - 1);

    setWinner('computer');
    setListening(false);
    setGameLog('Süre Bitti ⏰');
  };

  const goNextRound = () => {
    if (isGameOver) return;

    if (roundPlayer == 'computer') {
      setGameLog('Bilgisayar Oynuyor');
      listenComputer();
    } else {
      setGameLog(`${player} Oynuyor`);
      listenPlayer();
    }

    setPlayingStep(playingStep + 1);
    setTimer(8);
  };

  const restartGame = () => {
    setTimer(8);
    setPlayingStep(0);
    setGameLog('Bilgisayar Oynuyor');
    setWord('');
    setWordType('primary');
    setComputerWords([]);
    setPlayerWords([]);
    setListening(false);
    setWinner(null);
    setRoundPlayer('computer');
  };

  const getRandomLetter = () => {
    const chars = 'abcdefghjklmnoprstvyz';
    return chars.split('')[Math.floor(Math.random() * chars.length - 1)];
  };

  const listenPlayer = async () => {
    setListening(true);

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'tr';
    recognition.start();
    recognition.onresult = async function (event) {
      const transcript = event.results[0][0].transcript;

      setWord(transcript);
      setListening(false);

      recognition.stop();

      const checkInitialLetter = word.toLocaleLowerCase() != transcript.charAt(0).toLocaleLowerCase();

      if (playerWords.includes(transcript) || checkInitialLetter) {
        setWordType('error');

        await sleep(2000);

        setWinner('computer');
        setGameLog(`Kaybettin (kelimen: ${transcript})`);
        return;
      }

      setPlayerWords((oldArray) => [transcript, ...oldArray]);
      setWordType('secondary');

      await sleep(2000);

      const lastLetter = transcript.charAt(transcript.length - 1);
      setWordType('primary');
      setWord(lastLetter);
      setRoundPlayer('computer');
    };
  };

  const listenComputer = async () => {
    setListening(true);

    const forecastTime = Math.floor(Math.random() * 8) * 1000;

    await sleep(forecastTime);

    const currentLetter = word == '' ? getRandomLetter() : word;
    const filterNames = names.filter((name) => name.charAt(0) == currentLetter);
    const fallibility = ((filterNames.length - 1) / 100) * fallibilityRatio;
    const foundedName = filterNames[Math.floor(Math.random() * fallibility)];

    setWord(foundedName);

    const utterance = new SpeechSynthesisUtterance(foundedName);
    utterance.lang = 'tr';
    speechSynthesis.speak(utterance);

    setListening(false);

    await sleep(1000);

    if (computerWords.includes(foundedName)) {
      setWordType('error');

      await sleep(1000);

      setWinner('player');
      setGameLog('Tebrikler Kazandın :)');
      return;
    }

    setComputerWords((oldArray) => [foundedName, ...oldArray]);
    setWordType('secondary');

    await sleep(2000);

    const lastLetter = foundedName.charAt(foundedName.length - 1);
    setWordType('primary');
    setWord(lastLetter);
    setRoundPlayer('player');
  };

  return (
    <main>
      <h1 className={styles.title}>Kelime Türetme Oyunu</h1>
      <div className={styles.board}>
        <h4 className={cx(styles['board-log'], { [styles['microphone--listening']]: isListening })}>{gameLog}</h4>
        {!isGameOver ? (
          <Word word={word} type={wordType} />
        ) : (
          <Button className={styles.restartButton} label="Tekrar Oyna" onClick={restartGame} />
        )}
      </div>
      <div className={styles.scoreBoard}>
        <ScoreSheet playerName="Bilgisayar" type={computerScoreSheetType} words={computerWords} />
        <div className={styles.information}>
          <div className={cx(styles.microphone, { [styles['microphone--listening']]: isListening })}>
            <Microphone />
          </div>
          <span className={styles.timer}>{timer}</span>
          <div className={styles.progress}>
            <h5 className={styles['progress-label']}>Toplam İlerleme</h5>
            <span className={styles['progress-value']}>{playingStep}</span>
          </div>
        </div>
        <ScoreSheet
          playerName={player == undefined ? 'Oyuncu' : player.toString()}
          type={playerScoreSheetType}
          words={playerWords}
        />
      </div>
    </main>
  );
};

export default Game;
