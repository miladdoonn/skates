import Image from 'next/image';
import Link from 'next/link';
import { products } from '../database/skate';

export const metadata = {
  title: 'products page',
  description: 'all the contacts',
};

export default function ProductsPage() {
  return (
    <main>
      saktes
      {products.map((product) => {
        return (
          <div className="shoe" key={`product-div-${product.id}`}>
            <br />

            <Link href={`/products/${product.id}`}>{product.name}</Link>
            <br />
            <Image
              src={`/images/${product.name}.jpg`}
              width={150}
              height={150}
            />
          </div>
        );
      })}
    </main>
  );
}
