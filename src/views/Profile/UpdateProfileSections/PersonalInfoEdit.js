import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import classNames from "classnames";
import {setAlertMsg} from '../../../app/store/alert';
import {updateUserProfile} from '../../../app/store/userValidation';

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
} from '../../../components/components';

import {
    checkSpace,
    checkNumber,
    checkSpecialChar
} from '../../../utils/checkStringPatterns';

import defaultImg from '../../../assets/images/dolphin_profile.png';
import { camelToSpace } from '../../../utils/functions';
import { descriptionHelperText } from '../../../utils/variablesAndRegs';

const passReg = /(Password)/i;


const getIcon = (key, iconClass) => {
    if(passReg.test(key)) return <VpnKeyIcon className={iconClass} />;
    else if (key === 'displayName') return <People className={iconClass}/>
    else if (key === 'description') return <MusicNote className={iconClass}/>
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

    return <GridItem xs={12} sm={12} md={6}>
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
                    rows: '5',
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
        updateUserProfile,
        userInfo,
        loading,
        isChanged
    } = props;

    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgRoundedCircleHover,
        classes.imgFluid,
        classes.imgCursor,
    );

    const [profileImg, setProfileImg] = useState(userInfo.image ? userInfo.image : defaultImg);

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

    const onImgInputHandler = async (file) => {
        const imgData = new FormData();
        imgData.append("image", file);

        //console.log(imgData, file);
        const userId = userInfo._id;

        const ENDPOINT = process.env.REACT_APP_SERVERURL + `/api/user/update/profile/image/?userid=${userId}`;
        //console.log(ENDPOINT);

        try {
            const request = await fetch(ENDPOINT, {
                method: 'PATCH',
                body: imgData,
            });

            if(request.ok){
                const response = await request.json();
                //console.log(response);
                if(response.success){
                    setAlertMsg(response.message, 'success');
                    setProfileImg(response.newImg);
                }
                else {
                    setAlertMsg("서버 에러로 프사 변경에 실패했습니다.", 'error');
                }
            }

        }
        catch (err) {
            console.log(err);
            setAlertMsg("서버 에러로 프사 변경에 실패했습니다.", 'error');
        }
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
            updateUserProfile(inputs);
        }
    }

    if(isChanged || loading) return <CircularLoading />

    return (
        <div className={classes.tabBody}>
            <GridContainer 
                justify='center'
                alignContent='flex-end'
                alignItems='flex-end'
                style={{
                    paddingBottom: "20px"
                }}
            >
                <GridItem 
                    xs={12} sm={12} md={6} 
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <label htmlFor="profile-picture">
                    <img src={profileImg} className={imageClasses} alt={displayName} />
                    </label>
                    
                    <input 
                        type="file" 
                        name="profileImg"
                        id="profile-picture"
                        accept="image/jpeg, image/png"
                        onChange={e => onImgInputHandler(e.target.files ? e.target.files[0] : profileImg)}
                        style={{
                            display: 'none'
                        }}
                    />
                </GridItem>
                {DisplayNameInput(inputs, onInputHandler, classes.inputIconsColor)}
            </GridContainer>

            <GridContainer>
                {DescriptionInput(inputs, onInputHandler, classes.inputIconsColor)}
            </GridContainer>

            <GridContainer>
                {PasswordInputs(inputs, onInputHandler, classes.inputIconsColor)}
            </GridContainer>
            
            
            <GridContainer 
                className={classes.cardFooter} 
                direction='row-reverse'
            >
                <Button simple color="primary" size="lg" onClick={onSubmitHandler}>
                    Submit
                </Button>
            </GridContainer>

        </div>
    )
}

PersonalInfoEdit.propTypes = {
    classes: PropTypes.object,
    setAlertMsg: PropTypes.func,
    updateUserProfile: PropTypes.func,
    userInfo: PropTypes.object,
    loading: PropTypes.bool,
    isChanged: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    userInfo: state.auth.userData,
    isChanged: state.userValidation.changed,
})

export default connect(mapStateToProps, {setAlertMsg, updateUserProfile})(PersonalInfoEdit);

//https://github.com/loquemedalagana/dreaming-rocker-client-old-ver/blob/master/src/components/views/Users/UserInfo/ProfileImg.js
