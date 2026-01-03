import { fluxCartStore } from './store.interface';

export const initStore: fluxCartStore = {
  products: [],
  slug: '',
  categories: ["men's-fashion", 'electronics', "women's-fashion"],
  loading: false,
  wishlistItems: [],
};
