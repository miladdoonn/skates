import { notFound } from 'next/navigation';
import { getUserByUsername } from '../../../database/users';
import styles from './page.module.scss';

type Props = {
  params: { username: string };
};

export default async function ProfileUsernamePage({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  return (
    <main className={styles.id}>
      <div>username: {user.username}</div>
    </main>
  );
}
