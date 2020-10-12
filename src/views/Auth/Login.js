import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';

import {InputAdornment, IconButton, FormHelperText} from "@material-ui/core";
import Email from "@material-ui/icons/Email";
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

import {setAlertMsg} from '../../app/store/alert';

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
        ...rest 
    } = props;

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

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
        }
        if(!password){
            ok=false;
            setAlertMsg('비밀번호를 입력해주세요', 'error', 'password');
        }

        console.log(ok);
        //loginUser({ email, password });
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
                <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[cardAnimaton]}>
                    <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                        <h4>Login with</h4>
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
