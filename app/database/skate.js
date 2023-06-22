// server side only run in server components
// import fs from 'node:fs';

// fs.readFile('../app/page.js', () => {});

export const products = [
  {
    id: 1,
    name: 'blackhorse',
    type: 'skates',
    object: 'skate1',
    price: '19,99$',
  },
  { id: 2, name: 'bluesky', type: 'skates', object: 'skate2', price: '49,99$' },
  { id: 3, name: 'orange', type: 'skates', object: 'skate3', price: '39,99$' },
  { id: 4, name: 'thesun', type: 'skates', object: 'skate4', price: '29,99$' },
];

export function getProductsById(id) {
  return products.find((product) => product.id === id);
}
