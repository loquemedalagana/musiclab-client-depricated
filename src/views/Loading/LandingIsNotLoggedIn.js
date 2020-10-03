import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const LandingIsNotLoggedIn = () => {
    return (
        <div>
            
        </div>
    )
}

LandingIsNotLoggedIn.propTypes = {
    prop: PropTypes
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LandingIsNotLoggedIn));
