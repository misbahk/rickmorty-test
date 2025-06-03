# Rick & Morty Explorer

A React application that displays characters from the Rick and Morty API with pagination and detailed views.

## Features

- Display paginated character list (10 items per page)
- Persist current page in URL for sharing and refreshing
- Refresh button to update the current page
- Detailed character view with all information
- Responsive design
- Type-safe with TypeScript

## Tech Stack

- React
- TypeScript
- TanStack Router for routing
- TanStack Table for table functionality
- React Query for data fetching
- Tailwind CSS for styling

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/rick-morty-app.git
cd rick-morty-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── api/              # API functions and types
├── components/       # React components
│   ├── characters/   # Character-related components
│   └── ui/          # Reusable UI components
├── hooks/           # Custom React hooks
├── utils.ts         # Utility functions
├── App.tsx          # Root component
├── main.tsx         # Entry point
└── router.tsx       # Route configuration
```

## Development

- The app uses TypeScript for type safety
- React Query for data fetching and caching
- TanStack Router for type-safe routing
- TanStack Table for table functionality

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

MIT
