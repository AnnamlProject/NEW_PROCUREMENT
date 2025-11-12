import React from 'react';
import { QueryProvider } from './app/providers/QueryProvider';
import { AppRoutes } from './app/routes';

const App: React.FC = () => {
  return (
    <QueryProvider>
      <AppRoutes />
    </QueryProvider>
  );
};

export default App;
