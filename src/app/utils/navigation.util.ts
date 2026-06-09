import { ActivatedRoute, Router } from '@angular/router';

export type ReturnRoute = 'profile' | 'cart' | 'checkout' | 'home';

export const RETURN_TO_PARAM = 'returnTo';

const ROUTE_PATHS: Record<ReturnRoute, string> = {
  profile: '/profile',
  cart: '/cart',
  checkout: '/checkout',
  home: '/home',
};

export function parseReturnRoute(route: ActivatedRoute, fallback: ReturnRoute = 'cart'): ReturnRoute {
  const value = route.snapshot.queryParamMap.get(RETURN_TO_PARAM);
  if (value && value in ROUTE_PATHS) {
    return value as ReturnRoute;
  }
  return fallback;
}

export function returnQueryParams(returnTo: ReturnRoute): { returnTo: ReturnRoute } {
  return { returnTo };
}

export function navigateWithReturn(router: Router, path: string, returnTo: ReturnRoute): void {
  router.navigate([path], { queryParams: returnQueryParams(returnTo) });
}

export function getReturnPath(returnTo: ReturnRoute): string {
  return ROUTE_PATHS[returnTo];
}