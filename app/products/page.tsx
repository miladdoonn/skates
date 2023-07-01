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
                  src={`/images/${product.name}.jpg`}
                  width={150}
                  height={150}
                  alt="test"
                />
              </Link>
              <br />
              <Link href={`/products/${product.id}`}>{product.name}</Link>
            </div>
          );
        })}
      </section>
    </main>
  );
}
