/* eslint-disable react/function-component-definition, arrow-body-style */
import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import { Spin } from 'antd';

const Login = lazy(() => import('./components/login'));
const SignUp = lazy(() => import('./components/signUp'));
const SideBarMenu = lazy(() => import('./sideBarMenu'));
const ForgotPassword = lazy(() => import('./components/forgotPassword'));
const ResetPassword = lazy(() => import('./components/resetPassword'));
const PrivateRoute = lazy(() => import('./components/privateRoute'));
const Help = lazy(() => import('./components/help'));

const App = () => {
  return (
    <div>
      <Suspense fallback={(
        <div className="pagecenter">
          <Spin size="large" />
        </div>
      )}
      >
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/forgot-password" exact component={ForgotPassword} />
            <Route path="/reset-password/:token" component={ResetPassword} />
            <Route path="/rm-tool/help" component={Help} />
            <PrivateRoute path="/rm-tool" component={SideBarMenu} />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
};

export default App;
