import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CharacterTable from './components/characters/CharacterTable';
import CharacterDetail from './components/characters/CharacterDetail';

// Create a query client
const queryClient = new QueryClient();

// Create routes
const rootRoute = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <div className="app-container">
        <h1>Rick & Morty Explorer</h1>
        <div className="content">
          {/* Use Outlet component instead of outlet tag */}
          <Outlet />
        </div>
      </div>
    </QueryClientProvider>
  ),
});

// Import Outlet from router
import { Outlet } from '@tanstack/react-router';

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
