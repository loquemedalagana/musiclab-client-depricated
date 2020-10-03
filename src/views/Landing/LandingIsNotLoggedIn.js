import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const LandingIsNotLoggedIn = (props) => {


    return (
        <div>
            hello landing
        </div>
    )
}

LandingIsNotLoggedIn.propTypes = {
    props: PropTypes
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LandingIsNotLoggedIn));