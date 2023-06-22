import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductsById } from '../../database/skate';
import AddCart from './AddCart';

export const dynamic = 'force-dynamic';

export default function SkatePage({ params }) {
  const singleproducts = getProductsById(Number(params.productsId)); // i need to convert the string into a number

  if (!singleproducts) {
    notFound();
  }

  return (
    <main>
      <h1>{singleproducts.name}</h1>
      <Image
        className="image"
        src={`/images/${singleproducts.name}.jpg`}
        width={150}
        height={150}
      />
      <AddCart productsId={singleproducts.id} />
      this is a {singleproducts.type} new model of NB {singleproducts.object}
    </main>
  );
}
