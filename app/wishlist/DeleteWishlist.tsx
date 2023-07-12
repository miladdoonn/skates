'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  wishlists: {
    userId: number;
    id: number;
  };
};

export default function DeleteWishlists(props: Props) {
  console.log('test', props);
  const [error, setError] = useState('');
  const router = useRouter();

  return (
    <div>
      <button
        onClick={async () => {
          const response = await fetch(`/api/wishlists/${props.wishlists.id}`, {
            method: 'DELETE',
          });

          const data = await response.json();

          if (data.error) {
            setError(data.error);
            console.log(error);
            router.refresh();
          }
          router.refresh();
        }}
      >
        delete
      </button>
    </div>
  );
}
