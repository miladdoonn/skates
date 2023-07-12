'use client';
import { useState } from 'react';
import { WishlistResponseBodyPost } from '../api/wishlists/route';
import styles from './LogoutButton.module.scss';

type Props = {
  userId: number | undefined;
  productId: number;
};

export default function WishlistButton({ userId, productId }: Props) {
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  async function createWishlist() {
    const response = await fetch('/api/wishlists', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        productId,
      }),
    });

    const data: WishlistResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
    } else {
      setSuccessMessage('Added to wish list!');
    }
  }

  async function handleSubmit() {
    await createWishlist();
  }

  return (
    <div>
      <button onClick={handleSubmit}>Wishlist</button>
      {error !== '' && <div>{error}</div>}
      {successMessage !== '' && <div>{successMessage}</div>}
    </div>
  );
}
