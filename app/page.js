import './globals.scss';
import Link from 'next/link';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main>
      <div className={styles.mainpage}>
        <div className={styles.conatiner}>
          <div className={styles.secondcontain}>
            <div className={styles.conatiner2}>
              <div className={styles.conatiner3}>Hardgoods</div>
              <h2>Skates, Hiking & Bindings</h2>
              <div className={styles.letter}>
                Die Wahl des richitgenSet-Ups ist entscheidend für eine fahrt
                auf der Straße, bei der du dich richitg wohlfühlst. Stell jetzt
                deine perfekte Hardgoods Kombination zusammen
              </div>
              <Link href="/products" className={styles.link}>
                Mehr sehen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
