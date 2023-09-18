import { Link } from 'react-router-dom';

import { PageNav } from '@/components/PageNav/PageNav.tsx';

import styles from './Home.module.css';

export default function Home() {
  return (
    <main className={styles.homepage}>
      <PageNav />

      <section>
        <h1>Your Journey, Jotted Down!</h1>
        <h2>
          Every Journey Deserves a Story! With WanderNote, capture every
          memorable moment, sight, and sentiment of your travels. Every city,
          every date, every memory. Your digital travel diary awaits.
        </h2>

        <Link to="/login" className="cta cta--start">
          Start Journaling &rarr;
        </Link>
      </section>
    </main>
  );
}
