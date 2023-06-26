import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getproductsById } from '../../../database/products';
import AddCart from './AddCart';

export const dynamic = 'force-dynamic';
type Props = {
  params: {
    productsId: number;
  };
};
export default async function SingleProductpage(props: Props) {
  console.log('props', props.params.productsId);
  const singleproduct = await getproductsById(Number(props.params.productsId));
  console.log('test', singleproduct);
  if (!singleproduct) {
    notFound();
  }
  return (
    <div>
      <div>{singleproduct.name}</div>
      <Image
        className="image"
        src={`/images/${singleproduct.name}.jpg`}
        width={150}
        height={150}
        alt="test"
      />
      <AddCart productsId={singleproduct.id} />
      this is a {singleproduct.type} new model of NB {singleproduct.object}
    </div>
  );
}
