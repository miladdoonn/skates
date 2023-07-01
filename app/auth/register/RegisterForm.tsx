'use client';

import { Route } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';
import styles from './RegisterForm.module.scss';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const router = useRouter();

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  async function register() {
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ username, password, email }),
    });

    const data: RegisterResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
      return;
    }

    console.log(data.user);
    router.push(`/artworks` as Route);
    // we may have in the future revalidatePath()
    router.refresh();
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.form}>
        <h4 className={styles.title}>Please, register.</h4>
        <form
          className={styles.loginForm}
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
              value={password}
              type={passwordShown ? 'text' : 'password'}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />

            <button
              onClick={togglePassword}
              className={styles.showPasswordButton}
            >
              {passwordShown ? <RxEyeOpen /> : <RxEyeClosed />}
            </button>
          </div>
          <div>
            <label htmlFor="e-mail">E-mail:</label>
            <input
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
          </div>
          <button
            className={styles.loginSubmit}
            onClick={async () => await register()}
          >
            sign up
          </button>
          {error !== '' && <div className={styles.error}>{error}</div>}
          <div className={styles.signupContainer}>
            <p>
              Have an account yet?
              <Link href="/login" className={styles.loginLink}>
                Log in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
