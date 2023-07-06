'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';

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
    <form onSubmit={(event) => event.preventDefault()}>
      <label>
        username:
        <input
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
      </label>
      <label>
        password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </label>
      <button onClick={async () => await register()}>sign up</button>
      {error !== '' && <div>{error}</div>}
    </form>
  );
}
