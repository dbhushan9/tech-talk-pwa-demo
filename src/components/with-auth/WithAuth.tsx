import { Redirect } from "react-router-dom";

import React, { ComponentType } from 'react';
import { isLoggedIn } from "../../utils/utils";

export function WithAuth2<T>(Component: ComponentType<T>) {
  const isAuthorized = isLoggedIn();
  const redirectPath = '/login'
  return (hocProps: T) => {
    return (
      isAuthorized ? (
        <Component {...hocProps} />
      ) : (
        <Redirect
          to={{
            pathname: redirectPath,
          }}
        />
      )
    );
  }
}

// Authentication HoC
const WithAuth = ({ redirectPath = '/login' } = {}) => (Component: any) => (props: any) => {
  const isAuthorized = isLoggedIn();
  return (
    isAuthorized ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: redirectPath,
          state: { from: props.location },
        }}
      />
    )
  );
};

export default WithAuth;
