import { type FC } from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import './App.css';

const App: FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
