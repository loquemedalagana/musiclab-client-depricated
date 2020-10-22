import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Loading from '../components/Loading/LinearLoading';

const IsNotLoggedInRoute = ({
    component: Component,
    user,
    ...rest
}) => (
    <Route
        {...rest}
        render={props =>
            user.loading ? (
                <Loading />
            ) : !user.auth ? (
                <Component {...props} />
                ) : (
                    (user.userData.snsId && !user.userData.email && user.userData.points < 0) ? 
                    <Redirect to = '/emailregister' /> : 
                    <Redirect to = '/' />
            )
        }
    />
);


IsNotLoggedInRoute.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.auth
});

export default connect(mapStateToProps)(IsNotLoggedInRoute);