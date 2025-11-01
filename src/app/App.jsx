import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './AppRouter.jsx';

// import { AuthProvider } from '../contexts/AuthContext.jsx';

function App() {
  return (
    // <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    // </AuthProvider>
  );
}

export default App;