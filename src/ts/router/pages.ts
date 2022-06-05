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
}

export const PAGE: Record<PageKey, Page> = {
  products: {
    path: '/products',
    view: ProductContainerView,
  },
  charge: {
    path: '/charge',
    view: ChargeContainerView,
  },
  purchase: {
    path: '/purchase',
    view: PurchaseContainerView,
  },
  error: {
    path: '/error',
    view: NotFoundView,
  },
} as const;

export const PageList = Object.values(PAGE);
export type PageType = typeof PAGE[keyof typeof PAGE];
export type PathType = typeof PAGE[keyof typeof PAGE]['path'];
