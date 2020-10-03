import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';

import {Footer} from '../../components/components';
import {loginSignupUpdateStyles} from '../../assets/jss/material-kit-react/views/background';
import styles from '../../assets/jss/material-kit-react/views/LoginSignupStyle';

const useStyles = makeStyles(styles);

export const Login = (props) => {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(() => {
      setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;

    return (
        <div className={clsx(classes.pageHeader, loginSignupUpdateStyles().root)}>
            login page
            <Footer whiteFont />
        </div>
    )
}

Login.propTypes = {
    prop: PropTypes
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
