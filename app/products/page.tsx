import Image from 'next/image';
import Link from 'next/link';
import { getproducts } from '../../database/products';

export const metadata = {
  title: 'products page',
  description: 'all the contacts',
};

export default async function Productspage() {
  const products = await getproducts();
  return (
    <main>
      {products.map((product) => {
        return (
          <main key={`product-div-${product.id}`}>
            <Link href={`/products/${product.id}`}>{product.name} </Link>
            <Image
              src={`/images/${product.name}.jpg`}
              width={150}
              height={150}
              alt="test"
            />
          </main>
        );
      })}
    </main>
  );
}
