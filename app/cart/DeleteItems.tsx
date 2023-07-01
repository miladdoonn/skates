'use client';
import { useRouter } from 'next/navigation';
import { deleteItem } from './actions';

type Props = {
  product: number;
};

export default function DeleteItems(props: Props) {
  const router = useRouter();

  return (
    <div>
      <button
        data-test-id="cart-product-remove-<product id>"
        formAction={async () => {
          router.refresh();
          await deleteItem(props.product);
        }}
      >
        {' '}
        Remove
      </button>
    </div>
  );
}
