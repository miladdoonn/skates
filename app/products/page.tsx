import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '../../database/products';
import styles from './page.module.scss';

export const metadata = {
  title: 'products page',
  description: 'all the contacts',
};

export default async function Productspage() {
  const products = await getProducts();
  return (
    <main className={styles.main}>
      <h1 className={styles.titel}>Choose your favorite skateboard</h1>

      <section className={styles.productsContainer}>
        {products.map((product) => {
          return (
            <div key={`product-div-${product.id}`}>
              <Link
                data-test-id={`product-${product.id}`}
                href={`/products/${product.id}`}
              >
                {' '}
                <Image
                  className={`${styles.image} ${styles.hoverEffect} `}
                  src={`/images/${product.name}.jpg`}
                  width={200}
                  height={220}
                  alt="test"
                />
                <br />
                <div className={styles.div}>
                  <h2 className={styles.products}> {product.object}</h2>
                  <p className={styles.h2}>{product.name}</p>
                  <p className={styles.h1}>Price: {product.price}€</p>
                </div>
              </Link>
            </div>
          );
        })}
      </section>
    </main>
  );
}
