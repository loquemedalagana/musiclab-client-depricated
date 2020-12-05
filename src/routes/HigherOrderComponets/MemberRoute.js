import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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
          <Redirect to="/emailregister" />
        ) : (
          <Redirect to="/waitinglevelup" />
        )
      ) : (
        <Redirect to="/login" />
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
  userData: state.auth.userData,
  isLoading: state.auth.loading,
  isChanged: state.userValidation.changed,
});

export default connect(mapStateToProps)(MemberRoute);
