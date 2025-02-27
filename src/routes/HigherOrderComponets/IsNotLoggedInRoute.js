import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { EMAIL_REGISTER_ROUTE } from "../params/auth";
import Loading from "../../components/Loading/LinearLoading";

const IsNotLoggedInRoute = ({
  component: Component,
  user,
  isChanged,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        user.loading ? (
          <Loading />
        ) : !user.auth ? (
          isChanged ? (
            <Redirect to="/" />
          ) : (
            <Component {...props} />
          )
        ) : user.userData.snsId &&
          !user.userData.email &&
          user.userData.points < 0 ? (
          <Redirect to={EMAIL_REGISTER_ROUTE} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

IsNotLoggedInRoute.propTypes = {
  user: PropTypes.object.isRequired,
  isChanged: PropTypes.bool,
  component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  isChanged: state.userControl.changed,
});

export default connect(mapStateToProps)(IsNotLoggedInRoute);
