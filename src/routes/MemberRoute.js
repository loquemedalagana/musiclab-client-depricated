import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Loading from '../views/Pages/Loading/Loading';

const MemberRoute = ({
    component: Component,
    user,
    ...rest
}) => (
    <Route
        {...rest}
        render={props =>
            user.loading ? (
                <Loading />
            ) : user.auth ? (
                user.userData.points >= 0 ? 
                <Component {...props} /> :
                    <Redirect to = '/' />
                ) : (
                <Redirect to = '/login' />
            )
        }
    />
);


MemberRoute.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.auth,
});

export default connect(mapStateToProps)(MemberRoute);