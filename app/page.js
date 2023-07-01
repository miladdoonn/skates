import Image from 'next/legacy/image';
import styles from './page.Module.scss';

export default function Home() {
  return (
    <main>
      <h1 className={styles.landingText}>Welcome to the store</h1>
    </main>
  );
}
