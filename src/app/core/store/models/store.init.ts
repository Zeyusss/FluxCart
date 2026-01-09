import { JwtPayload } from '../../models/auth/auth';
import { CartProduct, CartResponse } from '../../models/cart/cart';
import { Product } from '../../models/products/products';
import { fluxCartStore } from './store.interface';

export const initStore: fluxCartStore = {
  products: [],
  slug: '',
  categories: ["men's-fashion", 'electronics', "women's-fashion"],
  loading: false,
  wishlistItems: [],
  wishlistIds: [],
  cartData: {} as CartResponse,
  cartItems: [],
  userData: {} as JwtPayload,
  productDetails: {} as Product,
};
