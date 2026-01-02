import { Product } from '../../models/products/products';

export interface fluxCartStore {
  products: Product[];
  slug: string;
  categories: string[];
  loading: boolean;
}
