import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getproductsById } from '../../../database/products';
import styles from './page.module.scss';
import ProductQuantityForm from './ProductQuantityForm';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Explore the dream',
  description: 'Products',
};

type Props = {
  params: {
    productsId: number;
  };
};
export default async function SingleProductpage(props: Props) {
  const singleproduct = await getproductsById(Number(props.params.productsId)); // Convert the string into a number

  if (!singleproduct) {
    notFound();
  }
  return (
    <main className={styles.productPage}>
      <Image
        className={`${styles.image} ${styles.hoverEffect}`}
        data-test-id="product-image"
        src={`/images/${singleproduct.name}.jpg`}
        alt="picture of the dream"
        width={300}
        height={300}
      />
      <h1>{singleproduct.name}</h1>
      <h5>{singleproduct.object}</h5>
      <h5 data-test-id="product-price">Price: {singleproduct.price}€</h5>
      <p>Quantity</p>
      <div>
        <ProductQuantityForm productId={singleproduct.id} />
      </div>
      {/* <p>Use your dreams carefully!</p> */}
    </main>
  );
}
