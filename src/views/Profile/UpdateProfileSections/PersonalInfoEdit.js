import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import {setAlertMsg} from '../../../app/store/alert';

import {
    VpnKey as VpnKeyIcon, MusicNote, People
} from '@material-ui/icons';


import {
    InputAdornment, 
} from "@material-ui/core";

import {
    GridItem,
    CustomInput,
    Button,
    CircularLoading,
    CardFooter,
} from '../../../components/components';

import {
    checkSpace,
//    checkNumber,
//    checkSpecialChar
} from '../../../utils/checkStringPatterns';

import { descriptionHelperText } from '../../../utils/variablesAndRegs';
const passReg = /(Password)/i;

const getIcon = (key, iconClass) => {
    if(passReg.test(key)) return <VpnKeyIcon className={iconClass} />;
    else if (key === 'displayname') return <People className={iconClass}/>
    else if (key === 'description') return <MusicNote className={iconClass}/>
}

const DescriptionInput = (inputs, onInputHandler, iconClass) => {
    const data = Object.keys(inputs).map(key => {
        if(passReg.test(key) || key !== 'description') return null;
        return (            
        <CustomInput
            labelText={descriptionHelperText}
            key={key}
            id={key}
            error={null}
            formControlProps={{
                fullWidth: true
            }}
            inputProps={{
                rows: '4',
                type: "text",
                multiline: true,
                name: key,
                value: inputs[key],
                onChange: onInputHandler,
                endAdornment: (
                        <InputAdornment position="end">
                            {getIcon(key, iconClass)}
                        </InputAdornment>
                )
            }}
        />)
    });

    return data;
}

const PasswordInputs = (inputs, onInputHandler, iconClass) => {
    const data = Object.keys(inputs).map(key => {
        if(!passReg.test(key)) return null;
        return (            
        <CustomInput
            labelText={`${key}...`}
            key={key}
            id={key}
            error={null}
            formControlProps={{
                fullWidth: false
            }}
            inputProps={{
                type: 'password',
                name: key,
                value: inputs[key],
                onChange: onInputHandler,
                endAdornment: (
                        <InputAdornment position="end">
                            {getIcon(key, iconClass)}
                        </InputAdornment>
                )
            }}
        />)
    });

    return data;
}

export const PersonalInfoEdit = props => {
    const {
        classes,
        setAlertMsg,
//        userInfo,
        loading,
        isChanged
    } = props;

    const [inputs, setInputs] = useState({
        image: '',
        displayName: '',
        description: '',
        password: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const {
        image,
        displayName,
        description,
        password,
        newPassword,
        confirmNewPassword,
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

        if(displayName) {

        }

        if(description) {

        }

        if(!password) {
            ok=false;
            setAlertMsg('기존 비밀번호를 입력해주세요.', 'error', 'password');
        }

        if(newPassword) {
            if(newPassword !== confirmNewPassword) {
                ok=false;
                setAlertMsg('비밀번호와 비밀번호 확인은 같아야합니다.', 'error', 'password');
            } else {
                if (checkSpace(newPassword) || checkSpace(confirmNewPassword)){
                    ok=false;
                    setAlertMsg('비밀번호에 공백이 들어갈 수 없습니다.', 'error', 'password');
                } else if (newPassword.length < 8){
                    ok=false;
                    setAlertMsg('비밀번호는 최소 8자 이상이어야 합니다.', 'error', 'password');
                }
            }
        }

        if(ok) {

        }
    }

    if(isChanged || loading) return <CircularLoading />

    return (
        <>
            <GridItem xs={12} sm={12} md={6}  >
                <h1>제발 돌아와만 주세요ㅠㅠ 언제까지 그렇게 사실겁니까?</h1>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}  >
                <h1>제발 돌아와만 주세요ㅠㅠ 언제까지 그렇게 사실겁니까?</h1>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}  >
                {DescriptionInput(inputs, onInputHandler, classes.inputIconsColor)}
            </GridItem>
            <GridItem xs={12} sm={12} md={12} className={classes.passwordInputs} >
                {PasswordInputs(inputs, onInputHandler, classes.inputIconsColor)}
            </GridItem>
            
            <CardFooter className={classes.cardFooter} >
                <Button simple color="primary" size="lg" onClick={onSubmitHandler}>
                    Submit
                </Button>
            </CardFooter>

        </>
    )
}

PersonalInfoEdit.propTypes = {
    classes: PropTypes.object,
    setAlertMsg: PropTypes.func,
    userInfo: PropTypes.object,
    loading: PropTypes.bool,
    isChanged: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    userInfo: state.auth.userData,
    isChanged: state.userValidation.changed,
})

export default connect(mapStateToProps, {setAlertMsg})(PersonalInfoEdit)
