# Rick and Morty Character Explorer

A single-page application that consumes the public Rick & Morty REST API and presents a paginated list of characters and details.

## Features

- Fetches data from the Rick & Morty API
- Displays a paginated character list using TanStack Table
- Persists the current page in both URL and localStorage
- Provides a refresh button to re-fetch the current page
- Shows character details on a dedicated route

## Technology Stack

- React 18
- TypeScript
- TanStack Query for data fetching
- TanStack Router for routing
- TanStack Table for the character list

## Project Structure

```
src/
├── api/                  # API client functions
├── components/           # React components
│   └── characters/       # Character-related components
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── App.css               # Application styles
├── App.tsx               # Main application component
├── main.tsx              # Application entry point
└── router.tsx            # TanStack Router configuration
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Implementation Details

- The application uses TanStack Query to fetch and cache data from the Rick & Morty API
- TanStack Router is used for routing and URL state management
- TanStack Table provides the data grid functionality for the character list
- The current page is persisted in both the URL and localStorage for state preservation
- Character details are displayed on a dedicated route with back navigation

## Deployment

To deploy this application:

1. Build the production version:
   ```
   pnpm run build
   ```
2. Deploy the contents of the `dist` directory to your hosting provider
