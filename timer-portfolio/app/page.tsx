// app/page.js
"use client"; // Menandakan ini adalah Client Component

import React, { useState, useEffect } from "react";
import styles from "./page.module.css"; // Kita akan gunakan CSS Module bawaan
import VantaBackground from './components/vantaBackground.js'; // Sesuaikan path jika perlu
export default function Home() {
  // State untuk menyimpan waktu (dalam detik)
  const [timeInSeconds, setTimeInSeconds] = useState(0);

  // State untuk menandakan apakah timer sedang berjalan
  const [isRunning, setIsRunning] = useState(false);

  // useEffect akan menangani logika interval (detik)
  useEffect(() => {
    let interval = null;

    if (isRunning) {
      // Jika sedang berjalan, buat interval baru setiap 1 detik
      interval = setInterval(() => {
        // Menambah waktu 1 detik
        setTimeInSeconds((prevTime) => prevTime + 1);
      }, 1000);//1000 Milidetik = 1 detik
    } else if (!isRunning && timeInSeconds !== 0) {
      // Jika di-pause (isRunning false) dan waktu tidak 0, hentikan interval
      clearInterval(interval);
    }

    // Ini adalah 'cleanup function'
    // Penting untuk membersihkan interval saat komponen di-unmount
    // atau saat 'isRunning' berubah
    return () => clearInterval(interval);
  }, [isRunning, timeInSeconds]); // 'dependency array'

  // Fungsi untuk tombol Start/Pause
  const handleStartPause = () => {
    setIsRunning(!isRunning); // Ubah status (jika running jadi pause, jika pause jadi running)
  };

  // Fungsi untuk tombol Reset
  const handleReset = () => {
    setIsRunning(false); // Matikan timer
    setTimeInSeconds(0); // Kembalikan waktu ke 0
  };

  // Fungsi untuk memformat waktu dari detik ke HH:MM:SS
  const formatTime = () => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    // Menambahkan '0' di depan jika angka < 10
    const pad = (num) => String(num).padStart(2, "0");

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  // Tampilan JSX
  return (
    <main className={styles.main}>
      <VantaBackground />
      <div className={styles.timerContainer}>
        <h1 className={styles.timerDisplay}>{formatTime()}</h1>
        <div className={styles.buttonContainer}>
          <button
            onClick={handleStartPause}
            className={`${styles.button} ${
              isRunning ? styles.pauseButton : styles.startButton
            }`}
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={handleReset}
            className={`${styles.button} ${styles.resetButton}`}
          >
            Reset
          </button>
        </div>
      </div>
    </main>
  );
}
