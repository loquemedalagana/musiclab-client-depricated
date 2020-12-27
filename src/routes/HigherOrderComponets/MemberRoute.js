import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  EMAIL_REGISTER_ROUTE,
  WAITING_LEVELUP_ROUTE,
  LOGIN_ROUTE,
} from "../params/auth";
import Loading from "../../components/Loading/LinearLoading";

const MemberRoute = ({
  component: Component,
  isLoading,
  userData,
  //isChanged,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isLoading ? (
        <Loading />
      ) : userData ? (
        userData.points >= 0 ? (
          <Component {...props} />
        ) : userData.snsId && !userData.email ? (
          <Redirect to={EMAIL_REGISTER_ROUTE} />
        ) : (
          <Redirect to={WAITING_LEVELUP_ROUTE} />
        )
      ) : (
        <Redirect to={LOGIN_ROUTE} />
      )
    }
  />
);

MemberRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
  userData: PropTypes.object,
  isLoading: PropTypes.bool,
  isChanged: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  isLoading: state.user.loading,
  isChanged: state.userControl.changed,
});

export default connect(mapStateToProps)(MemberRoute);
