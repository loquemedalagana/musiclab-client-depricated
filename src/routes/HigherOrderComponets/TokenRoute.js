import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const TokenRoute = ({
    component: Component,
    user,
    ...rest
}) => {

    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });
    console.log(query);
    console.log(Object.keys(query).length === 0);

    //check the token is valid?
    //login 처리

    return ( <Route
        {...rest}
        render={props =>
            user.loading ? (
                <Loading />
            ) : user.auth ? (
                user.userData.points >= 0 ? 
                <Component {...props} /> :
                    ((user.userData.snsId && !user.userData.email) ? 
                        <Redirect to = '/emailregister' /> :
                        <Redirect to = '/waitinglevelup' />
                    )
                ) : (
                <Redirect to = '/login' />
            )
        }
    />
)};

TokenRoute.propTypes = {
    user: PropTypes.object.isRequired,
    isChanged: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    
});

export default connect(mapStateToProps)(TokenRoute)
