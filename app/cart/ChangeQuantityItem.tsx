'use client';
import { useRouter } from 'next/navigation';
import { addQuantity, deleteQuantity } from './actions';
import styles from './ChangeQuantityItem.module.scss';

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
        className={styles.button}
        formAction={async () => {
          router.refresh();
          await deleteQuantity(props.product);
        }}
      >
        -
      </button>
      {props.product.quantity}
      <button
        className={styles.button}
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
