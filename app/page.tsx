"use client"
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { FiMoon, FiSun } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Home() {
  const targetDate = new Date('July 10, 2025 18:00:00 UTC');
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  function calculateTimeLeft(): TimeLeft {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (storedTheme) setTheme(storedTheme);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const bgColor = theme === 'light' ? '#f9f9f9' : '#0f0f0f';
  const textColor = theme === 'light' ? '#111' : '#fff';
  const accentColor = theme === 'light' ? '#111' : '#eee';

  return (
    <>
      <Head>
        <title>Hopium Resolution Date</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main style={{
        backgroundColor: bgColor,
        color: textColor,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Poppins', sans-serif",
        padding: '2rem',
        transition: 'all 0.3s ease'
      }}>
        <button
          onClick={toggleTheme}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'transparent',
            border: 'none',
            fontSize: '1.8rem',
            cursor: 'pointer',
            color: accentColor
          }}
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? <FiMoon /> : <FiSun />}
        </button>

        <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem', textAlign: 'center' }}>
          ⏳ Hopium Resolution Date
        </h1>

        <div style={{ display: 'flex', gap: '1rem', fontSize: '2rem', marginBottom: '3rem' }}>
          {(['days', 'hours', 'minutes', 'seconds'] as const).map((unit) => (
            <div key={unit} style={{ textAlign: 'center' }}>
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={timeLeft[unit]}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {timeLeft[unit]}
                </motion.div>
              </AnimatePresence>
              <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{unit}</div>
            </div>
          ))}
        </div>

        <footer style={{ position: 'absolute', bottom: 20, fontSize: '1rem', color: accentColor }}>
          Made with ❤️ by{' '}
          <a
            href="https://discord.com/users/788819407685943306"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: theme === 'light' ? '#0077ff' : '#7db4ff', textDecoration: 'none' }}
          >
            .mrcful
          </a>
        </footer>
      </main>
    </>
  );
}
