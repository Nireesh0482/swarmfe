/* eslint-disable react/function-component-definition, arrow-body-style, react/prop-types, react/jsx-props-no-spreading, max-len */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const accessToken = localStorage.getItem('accessToken');
  return (
    <div>
      <Route
        {...rest}
        render={(props) => (
          accessToken ? <Component {...props} /> : <Redirect to="/" />
        )}
      />
    </div>
  );
};

export default PrivateRoute;
