'use client';
import { useRouter } from 'next/navigation';
import { addQuantity, deleteQuantity } from './actions';

type Props = {
  product: {
    quantity: number;
  };
};

export default function ChangeQuantityItem(props: Props) {
  const router = useRouter();

  return (
    <div>
      <button
        formAction={async () => {
          router.refresh();
          await deleteQuantity(props.product);
        }}
      >
        -
      </button>
      {props.product.quantity}
      <button
        formAction={async () => {
          router.refresh();
          await addQuantity(props.product);
        }}
      >
        +
      </button>
    </div>
  );
}
