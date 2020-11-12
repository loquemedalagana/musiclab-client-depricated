import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
    Button,
    CircularLoading,
    CustomInput,
} from '../../../components/components';

import {
    Home as Blog, Twitter, Facebook, Instagram, YouTube
} from '@material-ui/icons';

export const SnsInfoEdit = props => {
    const {
        userInfo,
        loading,
        isChanged
    } = props;

    const [inputs, setInputs] = useState({
        oldPassWord: '',
        blog: '',
        twitter: '',
        facebook: '',
        instagram: '',
        youtube: '',
    });

    const {
        oldPassWord,
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
            edit sns link
        </div>
    )
}

SnsInfoEdit.propTypes = {
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
