import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { submitWishlist, WishlistSubmit } from '../../../database/wishlists';

type Error = {
  error: string;
};

export type WishlistResponseBodyPost =
  | {
      wishlist: WishlistSubmit;
    }
  | Error;

const wishlistSchema = z.object({
  userId: z.number(),
  artworkId: z.number(),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<WishlistResponseBodyPost>> {
  const body = await request.json();
  console.log('body', body);

  // zod please verify the body matches my schema
  const result = wishlistSchema.safeParse(body);
  console.log('result', result);

  if (!result.success) {
    console.log('Validation error:', result.error);
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'The data is incomplete',
      },
      { status: 400 },
    );
  }
  // query the database to get all the animals
  const wishlist = await submitWishlist(
    result.data.userId,
    result.data.artworkId,
  );

  if (!wishlist) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'Error creating the new wishlist',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    wishlist: wishlist,
  });
}
