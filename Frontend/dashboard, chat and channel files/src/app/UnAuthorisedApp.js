import React, { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { redirect } from 'react-router-dom';


const Login = lazy(() => import('../pages/Login'));

const UnAuthorisedApp = () => {
  const location = useLocation();
  return (
      <Routes>
      <Route exact path="/" component={Login} />  
    </Routes>
  );
};

export default UnAuthorisedApp;
