import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';

import {
    InputAdornment, 
    FormControlLabel, 
    Checkbox,
    FormHelperText
} from "@material-ui/core";
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Check from "@material-ui/icons/Check";

import { signupUser } from '../../app/store/userValidation';

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
import {defaultBgStyle} from '../../assets/jss/material-kit-react/views/background';
import styles from '../../assets/jss/material-kit-react/views/LoginSignupStyle';

import {checkIsValidEmail} from '../../utils/texts';
import {
    checkValidEmail,
    checkSpace,
    checkNumber,
    checkSpecialChar
} from '../../utils/checkStringPatterns';
import {setAlertMsg} from '../../app/store/alert';
import SocialLogin from './SocialLogin';

const useStyles = makeStyles(styles);

export const Signup= (props) => {
    const [cardAnimaton, setCardAnimation] = useState("cardHidden");
    setTimeout(() => {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { 
        setAlertMsg,
        alerts,
        isAuth,
        signupUser,
        isChanged,
//        ...rest 
    } = props;

    const [isChecked, setIsChecked] = useState(false);
    const [inputs, setInputs] = useState({
        email: '',
        displayName: '',
        password: '',
        confirmPassword: '',
    });

    const [nicknameErr, setNicknameErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);

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

    const onSubmitHandler = event => {
        event.preventDefault();
        let ok = true;
        if(!email) {
            ok=false;
            setAlertMsg('이메일을 입력해주세요', 'error', 'email');
            setEmailErr(true);
        }
        else if (!checkValidEmail(email)){
            ok=false;
            setAlertMsg('올바른 형식으로 입력해주세요.', 'error', 'email');
            setEmailErr(true);
        } else {
            setEmailErr(false);
        }

        if(!displayName){
            ok=false;
            setAlertMsg('닉네임을 입력해주세요', 'error', 'nickname');
            setNicknameErr(true);
        } else if (checkSpecialChar(displayName) || checkNumber(displayName) || checkSpace(displayName)){
            ok=false;
            setAlertMsg('닉네임에 숫자, 공백, 특수문자는 들어갈 수 없습니다.', 'error', 'nickname');
            setNicknameErr(true);
        } else {
            setNicknameErr(false);
        }

        if(!password || !confirmPassword){
            ok=false;
            setAlertMsg('비밀번호를 입력해주세요', 'error', 'password');
            setPasswordErr(true);
        } else if(password && password !== confirmPassword && confirmPassword){
            ok=false;
            setAlertMsg('비밀번호와 비밀번호 확인은 같아야합니다.', 'error', 'password');
            setPasswordErr(true);
        } else if (checkSpace(password) || checkSpace(confirmPassword)){
            ok=false;
            setAlertMsg('비밀번호에 공백이 들어갈 수 없습니다.', 'error', 'password');
            setPasswordErr(true);
        } else if (password.length < 8){
            ok=false;
            setAlertMsg('비밀번호는 최소 8자 이상이어야 합니다.', 'error', 'password');
            setPasswordErr(true);
        } else {
            setPasswordErr(false);
        }


        if(!isChecked){
            ok=false;
            setAlertMsg('유의사항을 읽으신 후 체크해주세요', 'error');
        }

        if(ok){
            signupUser(inputs);
        }
    }

    if(isAuth) return <Redirect to = '/' />;
    if(isChanged) return <Redirect to = '/waitinglevelup' />;

    return (
        <div className={clsx(classes.pageHeader, defaultBgStyle().root)}>
            <div className={classes.container}>
            <GridContainer justify={window.innerWidth > 959 ? "space-between" : "center"}>
                <GridItem xs={12} sm={12} md={5} lg={4}>
                <Card className={classes[cardAnimaton]}>
                    <form className={classes.form}>
                    <SocialLogin color = 'primary' classes={classes} />
                    <p className={classes.divider}>Or Be Classical</p>
                    <CardBody>
                        <CustomInput
                        labelText="Your nickname..."
                        id="displayname"
                        error={nicknameErr}
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
                        {alerts.map(({message, name, id}) => (name==='nickname') && (
                            <FormHelperText 
                            key = {id}
                            style = {{textAlign: 'right'}} 
                            error
                            >
                            {message}
                            </FormHelperText>
                        ))}

                        <CustomInput
                        labelText="Email..."
                        id="email"
                        error={emailErr}
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
                    <CustomInput
                        labelText="Confirm Password"
                        id="confirmpass"
                        formControlProps={{
                            fullWidth: true
                        }}
                        error={passwordErr}                     
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

                    <div
                        className={
                        classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal
                        }
                    >
                    <FormControlLabel
                        control={
                            <Checkbox
                            tabIndex={-1}
                            value = {isChecked}
                            onClick={() => isChecked ? setIsChecked(false) : setIsChecked(true)}
                            checkedIcon={<Check className={classes.checkedIcon} />}
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                                checked: classes.checked,
                                root: classes.checkRoot
                            }}
                            />
                        }
                        className={classes.formControl}
                        classes={{ label: classes.label }}
                        label={checkIsValidEmail}
                    />
                    </div>

                    </CardBody>

                    <CardFooter className={classes.cardFooter}>
                        <Button simple color="primary" size="lg" onClick={onSubmitHandler}>
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
    )
}

Signup.propTypes = {
    props: PropTypes.object,
    setAlertMsg: PropTypes.func,
    signupUser: PropTypes.func,
    alerts: PropTypes.array,
    isAuth: PropTypes.bool,
    isChanged: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    alerts: state.alert,
    isAuth: state.auth.auth,
    isChanged: state.userValidation.changed,
})

export default connect(mapStateToProps, {setAlertMsg, signupUser})(Signup)
