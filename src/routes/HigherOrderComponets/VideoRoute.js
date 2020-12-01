import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const VideoRoute = props => {
  const {
    isLoading,
    userData,
  } = props;

  //우선 user상태 본다.
  //쿼리에 아무것도 없으면 바로 리턴
  //쿼리에 userId가 검색되면? 멤버인지 검사

  return (
    <Route
      {...rest}
      render={props =>
        isLoading ? (
          <Loading />
        ) : userData ? (
              userData >= 0 ? 
                <Component {...props} /> :
                  ((userData.snsId && !userData.email) ? 
                    <Redirect to = '/emailregister' /> :
                    <Redirect to = '/waitinglevelup' />
                  )
                ) : (
              <Redirect to = '/login' />
        )
      }
    />
  )
}

VideoRoute.propTypes = {
  isLoading: PropTypes.bool,
  userData: PropTypes.object
}

const mapStateToProps = (state) => ({
  isLoading: state.auth.loading,
  userData: state.auth.userData
});

export default connect(mapStateToProps)(VideoRoute)
