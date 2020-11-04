import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import qs from 'qs';
import fetcher from '../../app/fetcher';
import useSWR from 'swr';

import Loading from '../../components/Loading/LinearLoading';
//import Notfound from '../Pages/NotFound';
//levelup, passwordreset page

const TokenRoute = ({
    component: Component,
    user,
    isChanged,
    location,
    ...rest
}) => {

    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });  
    const {token, expiredtime} = query;
    console.log(query, token, expiredtime);

    const ENDPOINT = `/api/user/checktoken/?token=${token}&expiredtime=${expiredtime}`;
    const {data, error} = useSWR(ENDPOINT, fetcher);

    console.log(data, error);

    /*
    
    const targetUserLoading = !data && !error;
    const thumbnail = data ? (data.userData.thumbnail ? data.userData.thumbnail : undefined) : undefined;

    
*/

    return ( <Route
        {...rest}
        render={props =>
            user.loading ? (
                <Loading />
            ) : <Component {...props} />
        }
    />
)};

TokenRoute.propTypes = {
    user: PropTypes.object.isRequired,
    isChanged: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    user: state.auth,
    isChanged: state.userValidation.changed
});

export default connect(mapStateToProps)(TokenRoute)
