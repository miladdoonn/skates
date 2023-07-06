import { Sql } from 'postgres';

export const products = [
  {
    id: 1,
    name: 'Yin and Yang',
    type: 'skates',
    object: 'Made in Austria',
    price: '19',
  },
  {
    id: 2,
    name: 'Hot Lava',
    type: 'board',
    object: 'Made in Australia',
    price: '49',
  },
  {
    id: 3,
    name: 'Blue Speed',
    type: 'waffle',
    object: 'Made in South Africa',
    price: '39',
  },
  {
    id: 4,
    name: 'Plan B',
    type: 'safe',
    object: 'Made in Germany',
    price: '50',
  },
  {
    id: 5,
    name: 'Shooting Stars',
    type: 'lila',
    object: 'Made in Sweden',
    price: '69',
  },
  { id: 6, name: 'Papaya', type: 'pin', object: 'Made in Spain', price: '79' },
  {
    id: 7,
    name: 'Red Pirate',
    type: 'mouse',
    object: 'Made in Italia',
    price: '25',
  },
  {
    id: 8,
    name: 'Brick Wall',
    type: 'sam',
    object: 'Made in Switzerland',
    price: '55',
  },
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
