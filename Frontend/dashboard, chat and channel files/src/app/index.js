import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuth } from '../hooks/useAuth';

const AuthenticatedApp = React.lazy(() => import('./AuthorisedApp'));
const UnAuthenticatedApp = React.lazy(() => import('./UnAuthorisedApp'));

const App = () => {
      {<AuthenticatedApp /> }
};

const AppWithProvider = () => {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
};

export default AppWithProvider;
