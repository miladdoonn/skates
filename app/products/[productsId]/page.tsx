import { cookies } from 'next/headers';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import { getproductsById } from '../../../database/products';
import { getValidSessionByToken } from '../../../database/sessions';
import { getUserBySessionToken } from '../../../database/users';
import WishlistButton from '../../components/WishlistButton';
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
  // 1. Check if the sessionToken cookie exit
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. check if the sessionToken has a valid session

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // 3. Either redirect or render the login form
  if (!session) {
    redirect(`/auth/login?returnTo=/products/${props.params.productsId}`);
  }
  const singleproduct = await getproductsById(Number(props.params.productsId)); // Convert the string into a number

  if (!singleproduct) {
    notFound();
  }
  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));
  // console.log('user', user);
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

      <div>
        <h1>{singleproduct.name}</h1>
        <h5 className={styles.h4}>{singleproduct.object}</h5>
        <h5 className={styles.h5} data-test-id="product-price">
          Price: {singleproduct.price}€
        </h5>
        <p>Quantity</p>

        <div>
          <ProductQuantityForm productId={singleproduct.id} />
        </div>
        <WishlistButton userId={user?.id} productId={singleproduct.id} />
        {/* <p>Use your dreams carefully!</p> */}
      </div>
    </main>
  );
}
