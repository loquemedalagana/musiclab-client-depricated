import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {setAlertMsg} from '../../../app/store/alert';

import {
    GridContainer,
    Button,
    CircularLoading,
    CustomInput,
    GridItem,
} from '../../../components/components';

import {
    InputAdornment, 
} from "@material-ui/core";

import {
    Home as Blog, Twitter, Facebook, Instagram, YouTube, Cloud as SoundCloud,
    VpnKey as VpnKeyIcon
} from '@material-ui/icons';

import {checkSnsLink} from '../../../utils/functions';

const SocialInputs = (inputs, onInputHandler, iconClass) => {
    const getIcon = key => {
        switch (key) {
            case 'youtube':
                return <YouTube className={iconClass} />
            case 'facebook':
                return <Facebook className={iconClass} />
            case 'twitter':
                return <Twitter className={iconClass} />
            case 'instagram':
                return <Instagram className={iconClass} />
            case 'soundcloud':
                return <SoundCloud className={iconClass} />
            default:
                return <Blog className={iconClass} />
        }
    }

    const data = Object.keys(inputs).map(key => {
        if(key === 'password') return null;
        return ( 
            <GridItem key={key}>
                <CustomInput
                    labelText={`your ${key} account...`}
                    
                    id={key}
                    error={null}
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        type: "text",
                        name: key,
                        value: inputs[key],
                        onChange: onInputHandler,
                        endAdornment: (
                                <InputAdornment position="end">
                                    {getIcon(key)}
                                </InputAdornment>
                        )
                    }}
                /> 
            </GridItem>)
    });

    return (
        data
    );
}

export const SnsInfoEdit = props => {
    const {
        classes,
        userInfo,
        loading,
        isChanged
    } = props;

    const [inputs, setInputs] = useState({
        password: '',
        blog: '',
        twitter: '',
        facebook: '',
        instagram: '',
        youtube: '',
        soundcloud: '',
    });

    const {
        password,
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
        const errorMessages = [];

        const ok = () => {
            for(const key in inputs){
                console.log(key, inputs[key]);
                if(inputs[key] && !checkSnsLink(key, inputs[key]) && key !== 'password') {
                    errorMessages.push(`올바르지 않은 ${key}주소 형식입니다.`);
                    return false;
                }
                else if (key === 'password' && !inputs[key]) {
                    errorMessages.push('비밀번호를 입력해주세요.');
                    return false;
                }
            }
            return true;
        }

        if(ok()){
            console.log('finished');
        } else {
            console.log(errorMessages);
        }
    }

    //console.log(inputs);

    if(userInfo && userInfo.social){
        //console.log(JSON.stringify(userInfo.social));
    }

    if(isChanged || loading) return <CircularLoading />

    return (
        <div className={classes.tabBody}>
            <GridContainer>
                {SocialInputs(inputs, onInputHandler, classes.inputIconsColor)}
            </GridContainer>
            

            <GridContainer className={classes.cardFooter} >
                <GridItem  xs={12} sm={12} md={6}>
                    <CustomInput
                        labelText="your password..."
                        id="pass"
                        error={null}                      
                        formControlProps={{
                            fullWidth: true,
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
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <Button simple color="primary" size="lg" onClick={onSubmitHandler}>
                        Submit
                    </Button>
                </GridItem>
            </GridContainer>
        </div>
    )
}

SnsInfoEdit.propTypes = {
    setAlertMsg: PropTypes.func,
    classes: PropTypes.object,
    userInfo: PropTypes.object,
    loading: PropTypes.bool,
    isChanged: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    userInfo: state.auth.userData,
    isChanged: state.userValidation.changed,
})

export default connect(mapStateToProps, {setAlertMsg})(SnsInfoEdit)
