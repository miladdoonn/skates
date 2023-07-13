import sjson from 'secure-json-parse';
import { ProductQuantities } from '../app/products/[productsId]/actions';

export function parseJson(
  stringifiedJson: string,
): undefined | ProductQuantities[] {
  if (!stringifiedJson) return undefined;

  try {
    return sjson(stringifiedJson);
  } catch {
    return undefined;
  }
}
