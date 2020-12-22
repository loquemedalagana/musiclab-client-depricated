import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import qs from "qs";
import fetcher from "../../app/api/fetcher";
import useSWR from "swr";

import { NOT_FOUND_ROUTE } from "../params/error";

import Loading from "../../components/Loading/LinearLoading";

const TokenRoute = ({ component: Component, isChanged, location, ...rest }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const { token, expiredtime } = query;

  const ENDPOINT = `/api/users/checktoken/?token=${token}&expiredtime=${expiredtime}`;
  const isExpired = Date.now() > expiredtime;
  const { data, error } = useSWR(
    isExpired ? null : ENDPOINT,
    isExpired ? null : fetcher
  );

  //console.log(data, error);
  console.log(isExpired ? "expired!" : "not expired");
  console.log(data);

  const LoadingToken = !data && !error && !isExpired;

  return (
    <Route
      {...rest}
      render={(props) =>
        LoadingToken ? (
          <Loading />
        ) : error || isExpired ? (
          <Redirect to={NOT_FOUND_ROUTE} />
        ) : isChanged ? (
          <Redirect to="/" />
        ) : data ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

TokenRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
  location: PropTypes.object,
  isChanged: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isChanged: state.userControl.changed,
});

export default connect(mapStateToProps)(TokenRoute);
