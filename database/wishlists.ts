import { cache } from 'react';
import { Wishlist } from '../migrations/1689002560-createTableWishList';
import { sql } from './connect';

export type WishlistSubmit = {
  id: number;
  userId: number;
  productId: number;
};

export type WishlistByUser = {
  wishlistId: number;
  name: string;
  object: string;
  url: string;
  userId: number;
  username: string;
  id: number;
  productId: number;
};

export const getWishlists = cache(async () => {
  const wishlists = await sql<Wishlist[]>`
    SELECT * FROM wishlists
 `;
  return wishlists;
});

export const getWishlistById = cache(async (id: number) => {
  const [wishlist] = await sql<Wishlist[]>`
    SELECT
      *
    FROM
    wishlists
    WHERE
      id = ${id}
  `;
  return wishlist;
});

export const submitWishlist = cache(
  async (userId: number, productId: number) => {
    const [wishlist] = await sql<WishlistSubmit[]>`
    INSERT INTO wishlists
      (user_id, product_id)
    VALUES
      (${userId}, ${productId})
    RETURNING
    id,
    user_id,
    product_id

 `;

    return wishlist;
  },
);

export const getWishlistByUser = cache(async (userId: number) => {
  console.log('database', userId);
  const wishlistWithUser = await sql<WishlistByUser[]>`
    SELECT
      products.*,
      wishlists.id AS wishlist
    FROM
      wishlists
    INNER JOIN
      products ON (
        wishlists.product_id = products.id
      )
    WHERE
      wishlists.user_id = ${userId}
  `;

  return wishlistWithUser;
});

export const deleteWishlistById = cache(async (id: number) => {
  const [wishlist] = await sql<Wishlist[]>`
    DELETE FROM
      wishlists
    WHERE
      id = ${id}
    RETURNING *
  `;
  return wishlist;
});
