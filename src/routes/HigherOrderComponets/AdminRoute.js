import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { LOGIN_ROUTE } from "../params/auth";
import Loading from "../../components/Loading/LinearLoading";

const AdminRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      user.loading ? (
        <Loading />
      ) : user.auth ? (
        user.userData.isadmin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      ) : (
        <Redirect to={LOGIN_ROUTE} />
      )
    }
  />
);

AdminRoute.propTypes = {
  user: PropTypes.object.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth,
});

export default connect(mapStateToProps)(AdminRoute);
