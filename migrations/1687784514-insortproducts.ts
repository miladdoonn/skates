import { Sql } from 'postgres';

export const products = [
  {
    id: 1,
    name: 'blackhorse',
    type: 'skates',
    object: 'skate1',
    price: '19',
  },
  { id: 2, name: 'bluesky', type: 'board', object: 'skate2', price: '49' },
  { id: 3, name: 'orange', type: 'waffle', object: 'skate3', price: '39' },
  { id: 4, name: 'thesun', type: 'safe', object: 'skate4', price: '29' },
];
export async function up(sql: Sql) {
  for (const product of products) {
    await sql`
 INSERT INTO products
 (name, type , object, price)
 VALUES
 (${product.name}, ${product.type}, ${product.object}, ${product.price})
  `;
  }
}
export async function down(sql: Sql) {
  for (const product of products) {
    await sql`
DELETE FROM products WHERE id = ${product.id}
  `;
  }
}
