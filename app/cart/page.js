import Image from 'next/image';
import Link from 'next/link';
import { getCookie } from '../../util/cookies';
import { parseJson } from '../../util/json';
import { getProductsById, products } from '../database/skate';

export default function CartPage() {
  // This is what we want when using cookies
  const productCookie = getCookie('cart');

  const productCookieQuantity = !productCookie ? [] : parseJson(productCookie);
  const productQuantity = productCookieQuantity.map((product) => {
    const matchingProductFromCookie = products.find(
      (productObject) => product.id === productObject.id,
    );
    console.log('viktor', matchingProductFromCookie);
    console.log('birthday', {
      ...product,
      quantity: matchingProductFromCookie?.quantity,
    });
    return { ...product, quantity: matchingProductFromCookie?.quantity };
  });
  console.log('Products', productQuantity);

  return (
    <div>
      {productQuantity.map((product) => {
        console.log('singleproduct', product);
        return (
          <div key={`products-${product.id}`}>
            <h1>h</h1>
            <h3>{product.price}</h3>
            {product.quantity}
            <Link href={`/categories/${product.id}`}>
              {product.productName}
            </Link>
            <br />
            <Image
              alt={products.productName}
              src={`/images/${product.name}.jpg`}
              width={150}
              height={150}
            />
          </div>
        );
      })}
    </div>
  );
}
