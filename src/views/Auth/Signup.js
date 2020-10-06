import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';

import {InputAdornment, IconButton} from "@material-ui/core";
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import {
    FacebookIcon, KakaoIcon, GoogleIcon
} from '../../assets/customIcons/SocialIcons/SocialIcons';

import {
    Footer,
    GridContainer,
    GridItem,
    Card,
    CardHeader,
    Button,
    CardBody,
    CustomInput,
    CardFooter,
    Header,
    HeaderLinks,
} from '../../components/components';
import {loginSignupUpdateStyle} from '../../assets/jss/material-kit-react/views/background';
import styles from '../../assets/jss/material-kit-react/views/LoginSignupStyle';
import {appTitle} from '../../utils/texts';
const useStyles = makeStyles(styles);

export const Signup= (props) => {
    const [cardAnimaton, setCardAnimation] = useState("cardHidden");
    setTimeout(() => {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;

    const [isChecked, setIsChecked] = useState(false);
    const [inputs, setInputs] = useState({
        email: '',
        displayName: '',
        password: '',
        confirmPassword: '',
    });

    const {
        email,
        displayName,
        password,
        confirmPassword,
    } = inputs;

    const onInputHandler = event => {
        const {name, value} = event.currentTarget;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    return (
        <>
            <Header
                absolute
                color="transparent"
                brand={appTitle}
                rightLinks={<HeaderLinks />}
                {...rest}
            />
        <div className={clsx(classes.pageHeader, loginSignupUpdateStyle().root)}>
            <div className={classes.container}>
            <GridContainer justify={window.innerWidth > 959 ? "space-between" : "center"}>
                <GridItem xs={12} sm={12} md={5} lg={4}>
                <Card className={classes[cardAnimaton]}>
                    <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                        <h4>Sign up with</h4>
                        <div className={classes.socialLine}>
                            <IconButton size='small'>
                                <KakaoIcon />
                            </IconButton>
                            <IconButton size='small'>
                                <GoogleIcon />
                            </IconButton>
                            <IconButton size='small'>
                                <FacebookIcon />
                            </IconButton>
                        </div>
                    </CardHeader>
                    <p className={classes.divider}>Or Be Classical</p>
                    <CardBody>
                        <CustomInput
                        labelText="Your nickname..."
                        id="first"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            type: "text",
                            name: "displayName",
                            value: displayName,
                            onChange: onInputHandler,
                            endAdornment: (
                            <InputAdornment position="end">
                                <People className={classes.inputIconsColor} />
                            </InputAdornment>
                            )
                        }}
                        />
                        <CustomInput
                        labelText="Email..."
                        id="email"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            type: "email",
                            name: "email",
                            value: email,
                            onChange: onInputHandler,
                            endAdornment: (
                            <InputAdornment position="end">
                                <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                            )
                        }}
                        />
                        <CustomInput
                        labelText="Password"
                        id="pass"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            type: "password",
                            name: "password",
                            value: password,
                            onChange: onInputHandler,
                            endAdornment: (
                            <InputAdornment position="end">
                                <VpnKeyIcon className={classes.inputIconsColor} />
                            </InputAdornment>
                            ),
                            autoComplete: "off"
                        }}
                        />
                    <CustomInput
                        labelText="Confirm Password"
                        id="confirmpass"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            type: "password",
                            name: "confirmPassword",
                            value: confirmPassword,
                            onChange: onInputHandler,
                            endAdornment: (
                            <InputAdornment position="end">
                                <VpnKeyIcon className={classes.inputIconsColor} />
                            </InputAdornment>
                            ),
                            autoComplete: "off"
                        }}
                        />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                        <Button simple color="primary" size="lg">
                        Join us
                        </Button>
                    </CardFooter>
                    </form>
                </Card>
                </GridItem>
            </GridContainer>
            </div>
            <Footer whiteFont />
        </div>
        </>
    )
}

Signup.propTypes = {
    props: PropTypes.object,
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
