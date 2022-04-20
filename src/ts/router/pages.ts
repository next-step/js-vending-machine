import ProductContainerView from '../views/ProductContainerView';
import ChargeContainerView from '../views/ChargeContainerView';
import PurchaseContainerView from '../views/PurchaseContainerView';
import ErrorPageView from '../views/ErrorPageView';

export type PageType = typeof PAGE[keyof typeof PAGE];

export const PAGE = {
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
    view: ErrorPageView,
  },
} as const;

export const PageList = Object.values(PAGE);
