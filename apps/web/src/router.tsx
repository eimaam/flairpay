import React, { createContext, useState, useEffect } from 'react';
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router';
import Nav from './components/Nav';
import Hero from './components/home/hero';
import {
  ReceiveCryptoPage,
  CardsPage,
  WalletPage,
  EverydayPaymentsPage,
  WhiteLabelPage,
  CaseStudiesPage,
  DocsPage,
  SdksPage,
  AuthPage,
  PricingPage,
  CompanyPage,
  SignInPage,
  RegisterPage
} from './pages/PlaceholderPages';

// Rate context to share rate state from the Root layout to page views
export const RateContext = createContext<{ rate: number }>({ rate: 1648 });

// Root Layout Component
function RootComponent() {
  // const [rate, setRate] = useState(1648);
  // const [secondsAgo, setSecondsAgo] = useState(18);
  // const [rateFlash, setRateFlash] = useState(false);

  // // dynamic Ticker Simulation shared globally
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setSecondsAgo((prev) => {
  //       if (prev >= 45) {
  //         setRate((oldRate) => {
  //           const delta = Math.random() > 0.5 ? 1 : -1;
  //           const nextRate = Math.min(Math.max(oldRate + delta, 1640), 1655);
  //           if (nextRate !== oldRate) {
  //             setRateFlash(true);
  //             setTimeout(() => setRateFlash(false), 800);
  //           }
  //           return nextRate;
  //         });
  //         return 0;
  //       }
  //       return prev + 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

  return (
    // <RateContext.Provider value={{ rate }}>
      <div className="min-h-screen bg-surface text-on-surface flex flex-col">
        <Nav  />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    // </RateContext.Provider>
  );
}

export const rootRoute = createRootRoute({
  component: RootComponent,
});

// 2. Index Route (Home Page / Landing)
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function IndexComponent() {
    const { rate } = React.useContext(RateContext);
    return <Hero rate={rate} />;
  },
});

// 3. Product Sub-routes
const receiveCryptoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products/receive-crypto',
  component: ReceiveCryptoPage,
});

const cardsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products/cards',
  component: CardsPage,
});

const walletRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products/wallet',
  component: WalletPage,
});

const everydayPaymentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products/everyday-payments',
  component: EverydayPaymentsPage,
});

// 4. Business Sub-routes
const whiteLabelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/business/white-label',
  component: WhiteLabelPage,
});

const caseStudiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/business/case-studies',
  component: CaseStudiesPage,
});

// 5. Developers Sub-routes
const docsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/developers/docs',
  component: DocsPage,
});

const sdksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/developers/sdks',
  component: SdksPage,
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/developers/auth',
  component: AuthPage,
});

// 6. Generic Top-level routes
const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pricing',
  component: PricingPage,
});

const companyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/company',
  component: CompanyPage,
});

const signinRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signin',
  component: SignInPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegisterPage,
});

// Define the Route Tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  receiveCryptoRoute,
  cardsRoute,
  walletRoute,
  everydayPaymentsRoute,
  whiteLabelRoute,
  caseStudiesRoute,
  docsRoute,
  sdksRoute,
  authRoute,
  pricingRoute,
  companyRoute,
  signinRoute,
  registerRoute,
]);

// Create the Router
export const router = createRouter({ routeTree });

// Register types for type-safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
