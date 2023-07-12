'use client';

import Image from 'next/image';
import Link from 'next/link';
import ProductQuantityForm from '../products/[productsId]/ProductQuantityForm';
import DeleteWishlists from './DeleteWishlist';
import styles from './MyWishlist.module.scss';

export default function MyWishlists(props: any) {
  return (
    <main className={styles.productPage}>
      {props.wishlists.map((wishlist: any) => {
        return (
          <div key={`wishlist-div-${wishlist.id}`}>
            <Link href={`/products/${wishlist.id}`}>
              <Image
                className={`${styles.image} ${styles.hoverEffect}`}
                src={`/images/${wishlist.name}.jpg`}
                alt="product image"
                width={0}
                sizes="100vw"
                height={0}
                style={{ width: '100%', height: 'auto' }}
              />
            </Link>

            <h5 className={styles.h4}>{wishlist.object}</h5>
            <h5 className={styles.h5} data-test-id="product-price">
              Price: {wishlist.price}€
            </h5>
            <p>Quantity</p>
            <ProductQuantityForm productId={wishlist.id} />
            <DeleteWishlists wishlists={wishlist} />
          </div>
        );
      })}
    </main>
  );
}
