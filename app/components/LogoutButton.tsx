'use client';
import { useRouter } from 'next/navigation';
import { logout } from '../../app/auth/logout/action';
import styles from './LogoutButton.module.scss';

export function LogoutButton() {
  const router = useRouter();
  return (
    <form>
      <button
        className={styles.button}
        formAction={async () => {
          await logout();
          router.refresh();
          router.push('/auth/login');
        }}
      >
        logout
      </button>
    </form>
  );
}
