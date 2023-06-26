import Image from 'next/image';
import Link from 'next/link';
import { getproducts } from '../../database/products';
import { getCookie } from '../../util/cookies';
import { parseJson } from '../../util/json';

export default async function CartPage() {
  const products = await getproducts();

  // This is what we want when using cookies
  const productCookie = getCookie('cart');

  const productCookieQuantity = !productCookie ? [] : parseJson(productCookie);
  console.log('milad', productCookieQuantity);
  const productQuantity = productCookieQuantity.map((product) => {
    console.log('alex', product);
    const matchingProductFromCookie = products.find(
      (productObject) => product.id === productObject.id,
    );
    console.log('viktor', matchingProductFromCookie);
    //return { ...product, quantity: matchingProductFromCookie?.quantity };
    return { ...matchingProductFromCookie, quantity: product?.quantity };
  });

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
