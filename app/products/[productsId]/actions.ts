'use server';

import { cookies } from 'next/headers';
import { getCookie } from '../../../util/cookies';
import { parseJson } from '../../../util/json';

export type ProductQuantities = {
  id: number;
  quantity: number;
};

export async function updateQuantity(productId: number, quantity: number) {
  // 1. Get the current cookie from the Request Headers

  const productQuantityCookie = getCookie('cart');
  // 2. Parse the cookie
  const productQuantities = !productQuantityCookie
    ? [] // 3. Create a new array with the productQuantity
    : parseJson(productQuantityCookie);
  // 4. Edit and get the object for the product in cookies

  // ? - I know, that this is not underfined
  const productToUpdate = productQuantities?.find((productQuantity) => {
    return productQuantity.id === productId;
  });
  // 5. Update the quantity in cartPage
  if (productToUpdate) {
    // 6. Update the quantity in the carPage by pushing add button
    productToUpdate.quantity =
      Number(productToUpdate.quantity) + Number(quantity);
  } else {
    // 7. Add the new value to current value in the cartPage

    // ! - use it only if you want to show an error (in our case it is ok)
    productQuantities!.push({
      id: productId,
      quantity: Number(quantity),
    });
  }
  // 8. Override the cookie (set cookies to the response headers)
  await cookies().set('cart', JSON.stringify(productQuantities));
}

export async function getQuantity() {
  // 1. Get the current cookie from the Request Headers

  const productQuantityCookie = await getCookie('cart');
  // 2. Parse the cookie
  const productQuantities = !productQuantityCookie
    ? [] // 3. Create a new array with the productQuantity
    : parseJson(productQuantityCookie);

  return productQuantities;
}
