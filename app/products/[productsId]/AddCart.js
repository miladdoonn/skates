'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createOrUpdateComment } from './actions';

// import styles from './ProductQuantityForm.module.scss';

// {id : number, comment: string}[]]

export default function AddCart(props) {
  const [quantity, setQuantity] = useState('1');
  const router = useRouter();

  return (
    <form>
      <input
        data-test-id="add-cart"
        type="number"
        min="1"
        value={quantity}
        onChange={(event) => {
          setQuantity(event.currentTarget.value);
        }}
      />
      <br />
      <button
        data-test-id="product-add-to-cart"
        formAction={async () => {
          router.refresh();
          await createOrUpdateComment(props.productsId, quantity);
        }}
      >
        Add to cart
      </button>
    </form>
  );
}
