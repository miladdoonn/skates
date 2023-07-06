import Image from 'next/image';
import Link from 'next/link';
// import Link from 'next/link';
import { getProducts } from '../../database/products';
import { combineData } from '../functions/combineData';
import { getQuantity } from '../products/[productsId]/actions';
import ChangeQuantityItem from './ChangeQuantityItem';
import DeleteItems from './DeleteItems';
import styles from './page.module.scss';

export const metadata = {
  title: 'Dreams',
  description: 'Enter the world of new dreams',
};

export default async function CartPage() {
  const productQuantity = await getQuantity();
  const products = await getProducts();

  const productInCart = combineData(productQuantity, products);

  function calculateTotalPrice() {
    return productInCart.reduce(
      (total, item) => total + item.quantity * item.price,
      0,
    );
  }
  let subTotalProductPrice = 0;

  if (productInCart.length === 0) {
    return <h6 className={styles.emptyCart}>The cart is empty</h6>;
  } else {
    return (
      <main>
        <section
          className={styles.cartPage}
          data-test-id="cart-product-quantity-<product id>"
        >
          {productInCart.map((product) => {
            subTotalProductPrice = product.quantity * product.price;

            return (
              <div key={`product-${product.id}`} className={styles.productCart}>
                <Image
                  alt=""
                  src={`/images/${product.name}.jpg`}
                  width={120}
                  height={150}
                />
                <div>Name: {product.name}</div>
                <div>Price: {product.price}</div>
                <div>Subtotal price: {subTotalProductPrice}</div>

                {/* <div>{product.totalQuantity}</div> */}
                <form>
                  <ChangeQuantityItem
                    product={product}
                    data-test-id="cart-product-quantity-<product id>"
                  />
                </form>

                <form>
                  <DeleteItems
                    product={product}
                    data-test-id="cart-product-remove-<product id>"
                  />
                </form>
              </div>
            );
          })}
          <div>
            Total price:
            <span data-test-id="cart-total">{calculateTotalPrice()}</span>
          </div>
          <Link
            className={styles.link}
            href="checkout/"
            data-test-id="cart-checkout"
          >
            Checkout!
          </Link>
        </section>
      </main>
    );
  }
}
