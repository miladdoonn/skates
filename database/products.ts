import { cache } from 'react';
import { Productsmigration } from '../migrations/1687784384-createTableproducts';
import { sql } from './connect';

export const getProducts = cache(async () => {
  const products = await sql<Productsmigration[]>`
 SELECT * FROM products;
  `;
  return products;
});
export const getproductsById = cache(async (id: number) => {
  console.log(typeof id);
  const [productsid] = await sql<Productsmigration[]>`
SELECT
*
 FROM
 products
 WHERE id =${id}
`;
  return productsid;
});
