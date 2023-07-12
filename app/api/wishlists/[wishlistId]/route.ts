import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getUserBySessionToken } from '../../../../database/users';
import { deleteWishlistById } from '../../../../database/wishlists';
import { Wishlist } from '../../../../migrations/1689002560-createTableWishList';
import { Error } from '../route';

type WishlistsResponseBodyDelete = { wishlist: Wishlist } | Error;

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<WishlistsResponseBodyDelete>> {
  const token = cookies().get('sessionToken');
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'Invalid Session Token' });
  }
  console.log(params.wishlistId);
  const wishlistId = Number(params.wishlistId);

  if (!wishlistId) {
    return NextResponse.json(
      {
        error: 'Invalid Favourite Id',
      },
      { status: 400 },
    );
  }

  const wishlist = await deleteWishlistById(wishlistId);

  if (!wishlist) {
    return NextResponse.json(
      {
        error: 'Favourite not found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ wishlist: wishlist });
}
