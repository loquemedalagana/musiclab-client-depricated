import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Loading from "../../components/Loading/LinearLoading";

const NonMemberRoute = ({ component: Component, user, isChanged, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      user.loading ? (
        <Loading />
      ) : user.auth ? (
        user.userData.points < 0 ? (
          user.userData.snsId && !user.userData.email ? (
            <Redirect to="/emailregister" />
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect to="/" />
        )
      ) : (
        <Redirect to="/login" />
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
  user: state.auth,
  isChanged: state.userValidationAndUpdate.changed,
});

export default connect(mapStateToProps)(NonMemberRoute);
