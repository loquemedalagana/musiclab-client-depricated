import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import qs from 'qs';
import fetcher from '../../app/fetcher';
import useSWR from 'swr';

import Loading from '../../components/Loading/LinearLoading';
//levelup, passwordreset page

const TokenRoute = ({
    component: Component,
    isChanged,
    location,
    ...rest
}) => {

    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });  
    const {token, expiredtime} = query;

    const ENDPOINT = `/api/user/checktoken/?token=${token}&expiredtime=${expiredtime}`;
    const isExpired = Date.now() > expiredtime;
    const {data, error} = useSWR(isExpired ? null : ENDPOINT, isExpired ? null : fetcher);

    //console.log(data, error);   
    console.log(isExpired ? "expired!" : null);
    
    const LoadingToken = !data && !error && !isExpired;

    return ( <Route
        {...rest}
        render={props =>
            LoadingToken ? (
                <Loading />
            ) : ( error || isExpired ? <Redirect to = '/notfound' />
                : <Component {...props} />
            )
        }
    />
)};

TokenRoute.propTypes = {
    isChanged: PropTypes.bool,
};

const mapStateToProps = (state) => ({

    isChanged: state.userValidation.changed
});

export default connect(mapStateToProps)(TokenRoute)
