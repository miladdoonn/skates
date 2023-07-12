'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';
import styles from './RegisterForm.module.scss';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  async function register() {
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    console.log('response from registerform.tsx:', response);
    const data: RegisterResponseBodyPost = await response.json();
    console.log('data from registerform.tsx:', data);
    if ('error' in data) {
      setError(data.error);
      return;
    }
    console.log(data.user);
    //router.push(`/profile/${data.user.username}`);
    // we may have in the future revalidatePath()
    router.refresh();
  }
  return (
    <div className={styles.Container}>
      <div className={styles.form}>
        <h3 className={styles.title}>Please, register.</h3>
        <form
          className={styles.login}
          onSubmit={(event) => event.preventDefault()}
        >
          <div>
            <label htmlFor="username">Username:</label>
            <input
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </div>
          <div>
            <label htmlFor="username">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </div>

          <button
            className={styles.loginf}
            onClick={async () => await register()}
          >
            sign up
          </button>
          {error !== '' && <div>{error}</div>}
          <div className={styles.signup}>
            <p>
              Have an account yet?
              <Link href="/auth/login" className={styles.Link}>
                Log in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
