import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';

import {
    InputAdornment, FormHelperText,
    FormControlLabel, Checkbox
} from "@material-ui/core";
import {
    People, VpnKey as VpnKeyIcon, MusicNote as MusicNoteIcon, Check,
} from "@material-ui/icons";

import {
    Footer,
    GridContainer,
    GridItem,
    Card,
    Button,
    CardBody,
    CustomInput,
    CardFooter,
    DateTimePicker,
    CustomSelectInput
} from '../../components/components';
import {loginSignupUpdateStyle} from '../../assets/jss/material-kit-react/views/background';
import styles from '../../assets/jss/material-kit-react/views/LevelupStyle';
import {checkAgreeLevelup, descriptionHelperText} from '../../utils/texts';
import {setAlertMsg} from '../../app/store/alert';

import {
    checkSpace,
    checkNumber,
    checkSpecialChar
} from '../../utils/checkStringPatterns';

const useStyles = makeStyles(styles);

const alignment = {
    justifyContent: 'space-between',
}

export const Levelup = (props) => {
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

    const [isChecked, setIsChecked] = useState(false);
    const [inputs, setInputs] = useState({
        givenName: '',
        familyName: '',
        description: '',

        password: '',
        confirmPassword: '',
    });

    const {
        givenName,
        familyName,
        description,

        password,
        confirmPassword,
    } = inputs;

    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState(new Date('1999-03-03')); //야다 데뷔일로 바꾸기
    const [birthdayChanged, setBirthdayChanged] = useState(false);

    const [familyNameErr, setFamilyNameErr] = useState(false);
    const [familyNameSuccess, setFamilyNameSuccess] = useState(false);
    const [givenNameErr, setGivenNameErr] = useState(false);
    const [givenNameSuccess, setGivenNameSuccess] = useState(false);

    const [birthdayErr, setBirthdayErr] = useState(false);

    const [genderErr, setGenderErr] = useState(false);
    const [genderSuccess, setGenderSuccess] = useState(false);

    const [descriptionErr, setDescriptionErr] = useState(false);
    const [descriptionSuccess, setDescriptionSuccess] = useState(false);


    const [passwordErr, setPasswordErr] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState(false);

    const onInputHandler = event => {
        const {name, value} = event.currentTarget;
        setInputs({
            ...inputs,
            [name]: (name === 'description' && value.length > 200) ? value.substr(0, 200) : value,
        })
    }

    const handleGenderChange = (event) => {
        setGender(event.target.value);
        setGenderErr(false);
        setGenderSuccess(true);
    };

    const handleDateChange = (date) => {
        setBirthdayChanged(true);
        setBirthdayErr(false);
        setBirthday(date._d);
    };

    const onSubmitHandler = event => {
        event.preventDefault();
        let ok = true;
        if(!givenName) {
            ok=false;
            setAlertMsg('이름을 입력해주세요', 'error', 'givenname');
            setGivenNameErr(true);
            setGivenNameSuccess(false);
        } else if (checkSpace(givenName) || checkNumber(givenName) || checkSpecialChar(givenName)) {
            ok=false;
            setAlertMsg('이름에 공백, 숫자, 특수문자가 들어갈 수 없습니다.', 'error', 'givenname');
            setGivenNameErr(true);
            setGivenNameSuccess(false);
        } else {
            setGivenNameErr(false);
            setGivenNameSuccess(true);
        }

        if(!familyName){
            ok=false;
            setAlertMsg('성을 입력해주세요', 'error', 'familyname');
            setFamilyNameErr(true);
            setFamilyNameSuccess(false);
        } else if (checkSpace(familyName) || checkNumber(familyName) || checkSpecialChar(familyName)) {
            ok=false;
            setAlertMsg('성에 공백, 숫자, 특수문자가 들어갈 수 없습니다.', 'error', 'familyname');
            setFamilyNameErr(true);
            setFamilyNameSuccess(false);
        } else {
            setFamilyNameErr(false);
            setFamilyNameSuccess(true);
        }

        if(!gender){
            ok=false;
            setAlertMsg('성별을 입력해주세요', 'error', 'gender');
            setGenderErr(true);
            setGenderSuccess(false);
        } 

        if(!birthdayChanged){
            ok=false;
            setBirthdayErr(true);
            setAlertMsg('생년월일을 입력해주세요', 'error', 'birthday');
        } 

        if(!description){  
            ok=false;
            setAlertMsg('야다 노래 중 가장 좋아하는 곡에 대해 설명해주세요', 'error', 'description');
            setDescriptionErr(true);
            setDescriptionSuccess(false);
        } else if (description.length > 200){
            ok=false;
//            setAlertMsg('자기소개는 200자를 넘어가면 안됩니다.', 'error', 'description');
            setDescriptionErr(true);
            setDescriptionSuccess(false);
        } else {
            setDescriptionErr(false);
            setDescriptionSuccess(true);
        }

        //if you are local user
        if(!password || !confirmPassword){
            ok=false;
            setAlertMsg('비밀번호를 입력해주세요', 'error', 'password');
            setPasswordErr(true);
            setPasswordSuccess(false);        
        } else if(password && password !== confirmPassword && confirmPassword){
            ok=false;
            setAlertMsg('비밀번호와 비밀번호 확인은 같아야합니다.', 'error', 'password');
            setPasswordErr(true);
            setPasswordSuccess(false);
        } else if (checkSpace(password) || checkSpace(confirmPassword)){
            ok=false;
            setAlertMsg('비밀번호에 공백이 들어갈 수 없습니다.', 'error', 'password');
            setPasswordErr(true);
            setPasswordSuccess(false);
        } else if (password.length < 8){
            ok=false;
            setAlertMsg('비밀번호는 최소 8자 이상이어야 합니다.', 'error', 'password');
            setPasswordErr(true);
            setPasswordSuccess(false);
        } else {
            setPasswordErr(false);
            setPasswordSuccess(true);            
        }

        if(!isChecked){
            ok=false;
            setAlertMsg('유의사항을 읽은 후 체크해주세요', 'error', 'general');
        }

        console.log(ok);
    }

    return (
        <>
        <div className={clsx(classes.pageHeader, loginSignupUpdateStyle().root)}>
            <div className={classes.container}>
                <GridContainer justify={window.innerWidth > 959 ? "space-between" : "center"}>
                    <GridItem xs={12} sm={12} md={6} lg={5} >
                    <Card className={classes[cardAnimaton]}>
                        <form className={classes.form}>

                        <p className={classes.divider}>실명과 생년월일은 운영진들한테만 공개됩니다.</p>
                        <CardBody className={alignment}>
                        <GridItem xs={12} sm={12} md={12}  >

                        <CustomInput
                            labelText="Family name(성)"
                            id="last"
                            formControlProps={{
                                fullWidth: true,
                            }}
                            success = {familyNameSuccess}
                            error={familyNameErr}
                            inputProps={{
                                type: "text",
                                value: familyName,
                                name: "familyName",
                                onChange: onInputHandler,
                                endAdornment: (
                                <InputAdornment position="end">
                                    <People className={classes.inputIconsColor} />
                                </InputAdornment>
                                )
                            }}
                        />
                        {alerts.map(({message, name, id}) => (name==='familyname') && (
                            <FormHelperText 
                            key = {id}
                            style = {{textAlign: 'right'}} 
                            error
                            >
                            {message}
                            </FormHelperText>
                        ))}  
                        <CustomInput
                            labelText="Given name(이름)"
                            id="first"
                            formControlProps={{
                                fullWidth: true,
                            }}
                            success = {givenNameSuccess}
                            error = {givenNameErr}
                            inputProps={{
                                type: "text",
                                value: givenName,
                                name: "givenName",
                                onChange: onInputHandler,
                                endAdornment: (
                                <InputAdornment position="end">
                                    <People className={classes.inputIconsColor} />
                                </InputAdornment>
                                )
                            }}
                        />
                        {alerts.map(({message, name, id}) => (name==='givenname') && (
                            <FormHelperText 
                            key = {id}
                            style = {{textAlign: 'right'}} 
                            error
                            >
                            {message}
                            </FormHelperText>
                        ))}                          
                        <CustomSelectInput 
                            labelText="Gender(성별)"
                            labelId="select-gender"
                            id="simple-select"
                            success = {genderSuccess}
                            error = {genderErr}
                            formControlProps={{
                                fullWidth: true,
                            }}                                
                            inputProps={{
                                varient: 'filled',
                                value: gender,
                                onChange: handleGenderChange
                            }}                      
                            menuItemList={[{key: 1, value: 'male', label: 'Male(남성)'}, {key: 2, value: 'female', label: 'Female(여성)'}]}
                        />
                        {alerts.map(({message, name, id}) => (name==='gender') && (
                            <FormHelperText 
                            key = {id}
                            style = {{textAlign: 'right'}} 
                            error
                            >
                            {message}
                            </FormHelperText>
                        ))}  
                        <br/> <br/>
                            <DateTimePicker 
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                success = {birthdayChanged}
                                error = {birthdayErr}
                                labelText = "Your birthday(생년월일)"
                                inputProps = {{
                                    
                                    placeholder: 'Pick your birthday!',
                                    value: birthday,
                                    onChange: handleDateChange
                                }}
                            />
                        {alerts.map(({message, name, id}) => (name==='birthday') && (
                            <FormHelperText 
                            key = {id}
                            style = {{textAlign: 'right'}} 
                            error
                            >
                            {message}
                            </FormHelperText>
                        ))}                              
                        <br/> <br/>                            
                            <CustomInput
                            formHelperText={descriptionHelperText}
                            id="description"
                            formControlProps={{
                                fullWidth: true
                            }}
                            success = {descriptionSuccess}
                            error = {descriptionErr}
                            inputProps={{
                                type: "text",
                                multiline: true,
                                name: "description",
                                value: description,
                                onChange: onInputHandler,
                                endAdornment: (
                                <InputAdornment position="end">
                                    <MusicNoteIcon className={classes.inputIconsColor} />
                                </InputAdornment>
                                )
                            }}
                            />
                            <FormHelperText style = {{textAlign: 'right'}} error={description.length >= 200 || descriptionErr ? true: false}>
                            {description.length >= 200 ? "자기소개는 최대 200자까지입니다." : description.length}
                            </FormHelperText>

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
                            <CustomInput
                                labelText="Confirm Password"
                                id="confirmpass"
                                error={passwordErr}
                                success={passwordSuccess}                                  
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

                    <div className={classes.checkboxAndRadio}>
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
                        label={checkAgreeLevelup}
                    />
                    </div>

                        </GridItem>

                        </CardBody>
                        <CardFooter className={classes.cardFooter}>
                            <Button simple color="primary" size="lg" onClick={onSubmitHandler}>
                            Submit
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

Levelup.propTypes = {
    props: PropTypes.object,
    setAlertMsg: PropTypes.func
}

const mapStateToProps = (state) => ({
    alerts: state.alert,
})

export default connect(mapStateToProps, {setAlertMsg})(Levelup);

/*
리덕스 추가되면 메인페이지로 이동

*/
