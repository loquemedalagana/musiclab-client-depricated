import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { WAITING_LEVELUP_ROUTE, LOGIN_ROUTE } from "../params/auth";
import Loading from "../../components/Loading/LinearLoading";

const NonMemberRoute = ({ component: Component, user, isChanged, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      user.loading ? (
        <Loading />
      ) : user.auth ? (
        user.userData.snsId &&
        !user.userData.email &&
        user.userData.points < 0 ? (
          isChanged ? (
            <Redirect to="/" />
          ) : (
            <Component {...props} />
          )
        ) : user.userData.points < 0 ? (
          <Redirect to={WAITING_LEVELUP_ROUTE} />
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
  component: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  isChanged: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.auth,
  isChanged: state.userControl.changed,
});

export default connect(mapStateToProps)(NonMemberRoute);
