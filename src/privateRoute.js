import React from "react";
import { Route, Redirect } from "react-router-dom";
import {connect} from "react-redux";


function PrivateRoute({ component: Component, auth : authData,  ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authData ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/"}}
          />
        )
      }
    />
  );
}
const mapStateToProps = state => {
    return {
        auth : state.authState,
    }
}
export default connect(mapStateToProps)(PrivateRoute);
