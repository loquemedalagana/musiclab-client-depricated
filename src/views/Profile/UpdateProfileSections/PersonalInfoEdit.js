import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import classNames from "classnames";
import {setAlertMsg} from '../../../app/store/alert';

import {
    VpnKey as VpnKeyIcon, MusicNote, People
} from '@material-ui/icons';


import {
    InputAdornment, 
    FormHelperText,
} from "@material-ui/core";

import {
    GridContainer,
    GridItem,
    CustomInput,
    Button,
    CircularLoading,
    CardFooter,
} from '../../../components/components';

import {
    checkSpace,
    checkNumber,
    checkSpecialChar
} from '../../../utils/checkStringPatterns';

import defaultImg from '../../../assets/images/dolphin_profile.png';
import { camelToSpace} from '../../../utils/functions';
import { descriptionHelperText } from '../../../utils/variablesAndRegs';

const passReg = /(Password)/i;


const getIcon = (key, iconClass) => {
    if(passReg.test(key)) return <VpnKeyIcon className={iconClass} />;
    else if (key === 'displayName') return <People className={iconClass}/>
    else if (key === 'description') return <MusicNote className={iconClass}/>
}

const ImageInput = (userData, onInputHandler, imageClasses) => {
    //original image will be added
    const {displayName, image} = userData;
    return (
        <GridItem>
            <label htmlFor="profile-picture">
            <img src={image ? image : defaultImg} className={imageClasses} alt={displayName} />
            </label>
            
            <input 
                type="file" 
                id="profile-picture"
                accept="image/jpeg, image/png"
                onChange={onInputHandler}
                style={{
                    display: 'none'
                }}
            />
        </GridItem>
    )
}

const DisplayNameInput = (inputs, onInputHandler, iconClass) => {
    const data = Object.keys(inputs).map(key => {
        if(passReg.test(key) || key !== 'displayName') return null;
        return (        
            <CustomInput
                labelText={`your new nickname...`}
                key={key}
                id={key}
                error={null}
                formControlProps={{
                    fullWidth: true,
                }}
                inputProps={{
                    rows: '4',
                    type: "text",
                    name: key,
                    value: inputs[key],
                    onChange: onInputHandler,
                    endAdornment: (
                            <InputAdornment position="end">
                                {getIcon(key, iconClass)}
                            </InputAdornment>
                    )
                }}
            />
        )
    });

    return <GridItem>
        {data}
    </GridItem>;
}

const DescriptionInput = (inputs, onInputHandler, iconClass) => {
    const data = Object.keys(inputs).map(key => {
        if(passReg.test(key) || key !== 'description') return null;
        return (
        <GridItem xs={12} sm={12} md={12} key = {key}>            
            <CustomInput
                labelText={descriptionHelperText}
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
            />
            <FormHelperText style = {{textAlign: 'right'}} error={inputs[key].length >= 200}>
                {inputs[key].length >= 200 ? "자기소개는 최대 200자까지입니다." : inputs[key].length}
            </FormHelperText>
        </GridItem>
        )
    });

    return data;
}

const PasswordInputs = (inputs, onInputHandler, iconClass) => {
    const data = Object.keys(inputs).map(key => {
        if(!passReg.test(key)) return null;
        return (            
        <CustomInput
            labelText={`${camelToSpace(key)}...`}
            key={key}
            id={key}
            error={null}
            formControlProps={{
                fullWidth: true,
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

    return (
        <GridItem xs={12} sm={12} md={12}>
            {data}
        </GridItem>
    );
}

export const PersonalInfoEdit = props => {
    const {
        classes,
        setAlertMsg,
        userInfo,
        loading,
        isChanged
    } = props;

    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid,
        classes.imgCursor,
    );

    const [profileImg, setProfileImg] = useState(defaultImg);

    const [inputs, setInputs] = useState({
        displayName: '',
        description: '',
        password: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const {
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
            [name]: (name === 'description' && value.length > 200) ? value.substr(0, 200) : value,
        })
    }
    
    const onSubmitHandler = event => {
        event.preventDefault();
        let ok = true;

        if(displayName) {
            if (checkSpecialChar(displayName) || checkNumber(displayName) || checkSpace(displayName)){
                ok=false;
                setAlertMsg('닉네임에 숫자, 공백, 특수문자는 들어갈 수 없습니다.', 'error', 'nickname');
            }
        }

        if(description && description.length > 200) { //글자 오버하면 컷팅하기
            ok = false;
            
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
        <GridContainer className={classes.tabBody} spacing={2}>
            <GridItem xs={12} sm={12} md={12} >
                
            </GridItem>

            {ImageInput(userInfo, null, imageClasses)}
            {DisplayNameInput(inputs, onInputHandler, classes.inputIconsColor)}

            {DescriptionInput(inputs, onInputHandler, classes.inputIconsColor)}

            {PasswordInputs(inputs, onInputHandler, classes.inputIconsColor)}

            
            <CardFooter className={classes.cardFooter} >
                <Button simple color="primary" size="lg" onClick={onSubmitHandler}>
                    Submit
                </Button>
            </CardFooter>

        </GridContainer>
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

export default connect(mapStateToProps, {setAlertMsg})(PersonalInfoEdit);

//https://github.com/loquemedalagana/dreaming-rocker-client-old-ver/blob/master/src/components/views/Users/UserInfo/ProfileImg.js
