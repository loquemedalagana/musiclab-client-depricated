import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
    Button,
    CircularLoading,
    CustomInput,
} from '../../../components/components';

import {
    InputAdornment, 
    FormControlLabel, 
    Checkbox,
    FormHelperText
} from "@material-ui/core";

import {
    Home as Blog, Twitter, Facebook, Instagram, YouTube, Cloud as SoundCloud,
    VpnKey as VpnKeyIcon
} from '@material-ui/icons';

import {checkSnsLink} from '../../../utils/functions';

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
        blog,
        twitter,
        facebook,
        instagram,
        youtube,
        soundcloud,
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

        if(twitter && !checkSnsLink('twitter', twitter)) {
            ok=false;
            //setalertmsg
        }

    }

    if(userInfo && userInfo.social){
        console.log(JSON.stringify(userInfo.social));
    }

    if(isChanged || loading) return <CircularLoading />

    return (
        <div>
            <CustomInput
                labelText="your facebook account..."
                id="facebook"
                error={null}
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    type: "text",
                    name: "facebook",
                    value: facebook,
                    onChange: onInputHandler,
                    endAdornment: (
                            <InputAdornment position="end">
                                <Facebook className={classes.inputIconsColor} />
                            </InputAdornment>
                    )
                }}
            />
            <CustomInput
                labelText="your instagram account..."
                id="instagram"
                error={null}
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    type: "text",
                    name: "instagram",
                    value: instagram,
                    onChange: onInputHandler,
                    endAdornment: (
                            <InputAdornment position="end">
                                <Instagram className={classes.inputIconsColor} />
                            </InputAdornment>
                    )
                }}
            />
            <CustomInput
                labelText="your youtube account..."
                id="youtube"
                error={null}
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    type: "text",
                    name: "youtube",
                    value: youtube,
                    onChange: onInputHandler,
                    endAdornment: (
                            <InputAdornment position="end">
                                <YouTube className={classes.inputIconsColor} />
                            </InputAdornment>
                    )
                }}
            />
            <CustomInput
                labelText="your twitter account..."
                id="twitter"
                error={null}
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    type: "text",
                    name: "twitter",
                    value: twitter,
                    onChange: onInputHandler,
                    endAdornment: (
                            <InputAdornment position="end">
                                <Twitter className={classes.inputIconsColor} />
                            </InputAdornment>
                    )
                }}
            />
            <CustomInput
                labelText="your soundcloud account..."
                id="soundcloud"
                error={null}
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    type: "text",
                    name: "soundcloud",
                    value: soundcloud,
                    onChange: onInputHandler,
                    endAdornment: (
                            <InputAdornment position="end">
                                <SoundCloud className={classes.inputIconsColor} />
                            </InputAdornment>
                    )
                }}
            />
            <CustomInput
                labelText="your blog account..."
                id="blog"
                error={null}
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    type: "text",
                    name: "blog",
                    value: blog,
                    onChange: onInputHandler,
                    endAdornment: (
                            <InputAdornment position="end">
                                <Blog className={classes.inputIconsColor} />
                            </InputAdornment>
                    )
                }}
            />

            <CustomInput
                labelText="your password..."
                id="pass"
                error={null}                      
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
        </div>
    )
}

SnsInfoEdit.propTypes = {
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

export default connect(mapStateToProps)(SnsInfoEdit)
