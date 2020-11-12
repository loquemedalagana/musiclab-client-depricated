import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import {
    Button,
    CircularLoading,
} from '../../../components/components';

export const PersonalInfoEdit = props => {
    const {
        userInfo,
        loading,
        isChanged
    } = props;

    const [inputs, setInputs] = useState({
        image: '',
        newDisplayName: '',
        oldPassWord: '',
        newPassword: '',
        confirmnewPassword: '',
    });

    const {
        image,
        newDisplayName,
        oldPassWord,
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
            edit personal info
        </div>
    )
}

PersonalInfoEdit.propTypes = {
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
