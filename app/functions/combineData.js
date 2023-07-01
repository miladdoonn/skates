export function combineData(cookie, products) {
  const combineProducts = cookie.map((cookieItem) => {
    const matchingProduct = products.find((item) => cookieItem.id === item.id);
    return {
      ...matchingProduct,
      quantity: cookieItem.quantity,
    };
  });

  return combineProducts;
}
