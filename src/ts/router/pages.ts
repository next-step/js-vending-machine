import { loadData } from '../state/store';
import ProductContainerView from '../views/ProductContainerView';
import ChargeContainerView from '../views/ChargeContainerView';
import PurchaseContainerView from '../views/PurchaseContainerView';
import NotFoundView from '../views/NotFoundView';

type PageKey = 'products' | 'charge' | 'purchase' | 'error';

type PageView =
  | typeof ProductContainerView
  | typeof ChargeContainerView
  | typeof PurchaseContainerView
  | typeof NotFoundView;

interface Page {
  path: string;
  view: PageView;
  props?: unknown;
}

export const PAGE: Record<PageKey, Page> = {
  products: {
    path: '/products',
    view: ProductContainerView,
    props: loadData('products'),
  },
  charge: {
    path: '/charge',
    view: ChargeContainerView,
    props: loadData('coins'),
  },
  purchase: {
    path: '/purchase',
    view: PurchaseContainerView,
    props: '',
  },
  error: {
    path: '/error',
    view: NotFoundView,
    props: '',
  },
} as const;

export const PageList = Object.values(PAGE);
export type PageType = typeof PAGE[keyof typeof PAGE];
export type PathType = typeof PAGE[keyof typeof PAGE]['path'];
