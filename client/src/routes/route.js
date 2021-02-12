import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import { auth } from "../AppConfig";

const cookies = new Cookies();
//AUTH related methods
//import { getLoginuser } from "../helpers/authUtils";

const AppRoute = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  authToken: authToken,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      //if (isAuthProtected && (cookies.get('token') === null || cookies.get('token') === undefined)) {
      if (isAuthProtected && (authToken === null || authToken === undefined)) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }

      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);

export default AppRoute;
