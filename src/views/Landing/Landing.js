import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';

import { makeStyles } from "@material-ui/core/styles";
import {loginSignupUpdateStyles} from '../../assets/jss/material-kit-react/views/background';
import styles from '../../assets/jss/material-kit-react/views/LoginSignupStyle';

const useStyles = makeStyles(styles);

export const Landing = (props) => {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(() => {
      setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;

    return (
        <div className={clsx(classes.pageHeader, loginSignupUpdateStyles().root)}>
            hello landing
        </div>
    )
}

Landing.propTypes = {
    props: PropTypes
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Landing));