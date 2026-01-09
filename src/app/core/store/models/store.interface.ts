import { JwtPayload } from '../../models/auth/auth';
import { CartProduct, CartResponse } from '../../models/cart/cart';
import { Product } from '../../models/products/products';
import { UserProduct } from '../../models/wishlist/wishlist';

export interface fluxCartStore {
  products: Product[];
  slug: string;
  categories: string[];
  loading: boolean;
  wishlistItems: UserProduct[];
  wishlistIds: string[];
  cartData: CartResponse;
  cartItems: CartProduct[];
  userData: JwtPayload;
}
