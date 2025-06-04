import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, lazy } from 'react';

// Create a query client
const queryClient = new QueryClient();

// Lazy load components
const CharacterTable = lazy(() => import('./components/characters/CharacterTable'));
const CharacterDetail = lazy(() => import('./components/characters/CharacterDetail'));

// Create routes
const rootRoute = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <div className="app-container">
        <h1>Rick & Morty Explorer</h1>
        <div className="content">
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </QueryClientProvider>
  ),
});

// Home route with character list
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: CharacterTable,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: search.page ? Number(search.page) : 1,
    };
  },
});

// Character detail route
const characterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/character/$id',
  component: CharacterDetail,
});

// Create the router
const routeTree = rootRoute.addChildren([indexRoute, characterRoute]);

export const router = createRouter({ routeTree });

// Register the router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
