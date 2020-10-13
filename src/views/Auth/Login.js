import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';

import {InputAdornment, FormHelperText} from "@material-ui/core";
import Email from "@material-ui/icons/Email";
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import {
    Footer,
    GridContainer,
    GridItem,
    Card,
    Button,
    CardBody,
    CustomInput,
    CardFooter,
} from '../../components/components';
import {loginSignupUpdateStyle} from '../../assets/jss/material-kit-react/views/background';
import styles from '../../assets/jss/material-kit-react/views/LoginSignupStyle';

import {setAlertMsg} from '../../app/store/alert';

import SocialLogin from './SocialLogin';

const useStyles = makeStyles(styles);

//https://www.softkraft.co/how-to-setup-slices-with-redux-toolkit/

export const Login = (props) => {
    const [cardAnimaton, setCardAnimation] = useState("cardHidden");
    setTimeout(() => {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { 
        setAlertMsg,
        alerts,
//        ...rest 
    } = props;

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const [emailErr, setEmailErr] = useState(false);
    const [emailSuccess, setEmailSuccess] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState(false);

    const { email, password } = inputs;

    const onInputHandler = event => {
        const {name, value} = event.currentTarget;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const onSubmitHandler = event => {
        event.preventDefault();
        let ok = true;
        if(!email) {
            ok=false;
            setAlertMsg('이메일을 입력해주세요', 'error', 'email');
            setEmailErr(true);
            setEmailSuccess(false);
        }
        else {
            setEmailErr(false);
            setEmailSuccess(true);
        }
        if(!password){
            ok=false;
            setAlertMsg('비밀번호를 입력해주세요', 'error', 'password');
            setPasswordErr(true);
            setPasswordSuccess(false);
        }
        else {
            setPasswordErr(false);
            setPasswordSuccess(true);
        }

        console.log(ok);
        //loginUser({ email, password });
    }

    return (
        <>
        <div className={clsx(classes.pageHeader, loginSignupUpdateStyle().root)}>
            <div className={classes.container}>
            <GridContainer justify={window.innerWidth > 959 ? "space-between" : "center"}>
                <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[cardAnimaton]}>
                    <form className={classes.form}>
                    <SocialLogin color = 'primary' classes={classes} />
                    <p className={classes.divider}>Or Be Classical</p>
                    <CardBody>
                        <CustomInput
                        labelText="Email..."
                        id="email"
                        error = {emailErr}
                        success = {emailSuccess}
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
                        {alerts.map(({message, name, id}) => (name==='email') && (
                            <FormHelperText 
                            key = {id}
                            style = {{textAlign: 'right'}} 
                            error
                            >
                            {message}
                            </FormHelperText>
                        ))}
                        <CustomInput
                        labelText="Password"
                        id="pass"
                        error={passwordErr}
                        success={passwordSuccess}
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
                        {alerts.map(({message, name, id}) => (name==='password') && (
                            <FormHelperText 
                            key = {id}
                            style = {{textAlign: 'right'}} 
                            error
                            >
                            {message}
                            </FormHelperText>
                        ))}
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                        <Button simple color="primary" size="lg" onClick={onSubmitHandler}>
                        Get started
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

Login.propTypes = {
    props: PropTypes.object,
    setAlertMsg: PropTypes.func,
    alerts: PropTypes.array,
}

const mapStateToProps = (state) => ({
    alerts: state.alert,
})

export default connect(mapStateToProps, {setAlertMsg})(Login)
