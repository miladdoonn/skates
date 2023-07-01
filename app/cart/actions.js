'use server';

import { cookies } from 'next/headers';
import { getCookie } from '../../util/cookies';
import { parseJson } from '../../util/json';

// remove product from cart
export async function deleteItem(products) {
  const productQuantityCookie = getCookie('cart'); // get the current cookies from the Request Headers
  const productQuantities = !productQuantityCookie // parse the cookie
    ? []
    : parseJson(productQuantityCookie);
  // filter the arrays of items in the cart
  // assign the filtered array to a new variable
  const removeFromCart = productQuantities.filter(
    (product) => product.id !== products.id, // return a new array without the item that has been deleted
  );
  await cookies().set('cart', JSON.stringify(removeFromCart));
}

// increase quantity
export async function addQuantity(products) {
  const productQuantityCookie = getCookie('cart');
  const productQuantities = !productQuantityCookie
    ? []
    : parseJson(productQuantityCookie);
  const increase = productQuantities.find((product) => {
    return product.id === products.id;
  });
  increase.quantity += 1;
  await cookies().set('cart', JSON.stringify(productQuantities));
}

// decrease quantity
export async function deleteQuantity(products) {
  const productQuantityCookie = getCookie('cart');
  const productQuantities = !productQuantityCookie
    ? []
    : parseJson(productQuantityCookie);
  const decrease = productQuantities.find((product) => {
    return product.id === products.id;
  });

  // tenary operator shows that everything before ? is the condition and after ? comes the true statement. If decrease.quantity is lover than 1 it will show 1, else it will decrease the quantitu by 1
  decrease.quantity = decrease.quantity - 1 < 1 ? 1 : decrease.quantity - 1;

  await cookies().set('cart', JSON.stringify(productQuantities));
}

// clear cookies after pressing checkout button
export async function clearCookies() {
  await cookies().set({
    name: 'cart',
    value: '',
    expires: new Date('2016-10-05'),
    path: '/',
  });
}
