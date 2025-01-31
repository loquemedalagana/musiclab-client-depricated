import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { EMAIL_REGISTER_ROUTE, LOGIN_ROUTE } from "../params/auth";
import Loading from "../../components/Loading/LinearLoading";

// 리팩토링 필요

const NonMemberRoute = ({ component: Component, user, isChanged, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      user.loading ? (
        <Loading />
      ) : user.auth ? (
        user.userData.points < 0 ? (
          user.userData.snsId && !user.userData.email ? (
            <Redirect to={EMAIL_REGISTER_ROUTE} />
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect to="/" />
        )
      ) : (
        <Redirect to={LOGIN_ROUTE} />
      )
    }
  />
);

NonMemberRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
  user: PropTypes.object.isRequired,
  isChanged: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
  isChanged: state.userControl.changed,
});

export default connect(mapStateToProps)(NonMemberRoute);
