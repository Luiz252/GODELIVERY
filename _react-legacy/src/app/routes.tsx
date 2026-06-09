import { createBrowserRouter, Outlet } from 'react-router';
import { SplashScreen } from './components/SplashScreen';
import { OnboardingScreen1 } from './components/OnboardingScreen1';
import { OnboardingScreen2 } from './components/OnboardingScreen2';
import { OnboardingScreen3 } from './components/OnboardingScreen3';
import { LoginScreen } from './components/LoginScreen';
import { SignupScreen } from './components/SignupScreen';
import { ForgotPasswordScreen } from './components/ForgotPasswordScreen';
import { OTPVerificationScreen } from './components/OTPVerificationScreen';
import { ResetPasswordScreen } from './components/ResetPasswordScreen';
import { HomeScreen } from './components/HomeScreen';
import { SearchScreen } from './components/SearchScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { RestaurantScreen } from './components/RestaurantScreen';
import { CartScreen } from './components/CartScreen';
import { AddressSelectScreen } from './components/AddressSelectScreen';
import { AddAddressScreen } from './components/AddAddressScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { OrderConfirmationScreen } from './components/OrderConfirmationScreen';
import { AddPaymentScreen } from './components/AddPaymentScreen';
import { PixPaymentScreen } from './components/PixPaymentScreen';
import { ProductScreen } from './components/ProductScreen';
import { OrdersScreen } from './components/OrdersScreen';
import { FavoritesScreen } from './components/FavoritesScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ErrorBoundary } from './components/ErrorBoundary';

function RootLayout() {
  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        Component: SplashScreen,
      },
      {
        path: '/onboarding-1',
        Component: OnboardingScreen1,
      },
      {
        path: '/onboarding-2',
        Component: OnboardingScreen2,
      },
      {
        path: '/onboarding-3',
        Component: OnboardingScreen3,
      },
      {
        path: '/login',
        Component: LoginScreen,
      },
      {
        path: '/signup',
        Component: SignupScreen,
      },
      {
        path: '/forgot-password',
        Component: ForgotPasswordScreen,
      },
      {
        path: '/otp-verification',
        Component: OTPVerificationScreen,
      },
      {
        path: '/reset-password',
        Component: ResetPasswordScreen,
      },
      {
        path: '/home',
        Component: HomeScreen,
      },
      {
        path: '/search',
        Component: SearchScreen,
      },
      {
        path: '/notifications',
        Component: NotificationsScreen,
      },
      {
        path: '/restaurant/:id',
        Component: RestaurantScreen,
      },
      {
        path: '/product/:id',
        Component: ProductScreen,
      },
      {
        path: '/orders',
        Component: OrdersScreen,
      },
      {
        path: '/favorites',
        Component: FavoritesScreen,
      },
      {
        path: '/profile',
        Component: ProfileScreen,
      },
      {
        path: '/cart',
        Component: CartScreen,
      },
      {
        path: '/address-select',
        Component: AddressSelectScreen,
      },
      {
        path: '/add-address',
        Component: AddAddressScreen,
      },
      {
        path: '/checkout',
        Component: CheckoutScreen,
      },
      {
        path: '/order-confirmation',
        Component: OrderConfirmationScreen,
      },
      {
        path: '/add-payment',
        Component: AddPaymentScreen,
      },
      {
        path: '/pix-payment',
        Component: PixPaymentScreen,
      },
    ],
  },
]);