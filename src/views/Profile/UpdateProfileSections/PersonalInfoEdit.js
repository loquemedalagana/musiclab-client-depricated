import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import {
    VpnKey as VpnKeyIcon
} from '@material-ui/icons';


import {
    InputAdornment, 
} from "@material-ui/core";

import {
    CustomInput,
    Button,
    CircularLoading,
} from '../../../components/components';

export const PersonalInfoEdit = props => {
    const {
        classes,
        userInfo,
        loading,
        isChanged
    } = props;

    const [inputs, setInputs] = useState({
        image: '',
        newDisplayName: '',
        password: '',
        newPassword: '',
        confirmnewPassword: '',
    });

    const {
        image,
        newDisplayName,
        password,
        newPassword,
        confirmnewPassword,
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

    }

    if(isChanged || loading) return <CircularLoading />

    return (
        <div>
            <CustomInput
                labelText="your old password..."
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

PersonalInfoEdit.propTypes = {
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

export default connect(mapStateToProps)(PersonalInfoEdit)
