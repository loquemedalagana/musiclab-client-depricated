import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
    Button,
    CircularLoading,
} from '../../../components/components';

export const UserHashtagsEdit = props => {
    const {
        classes,
        userInfo,
        loading,
        isChanged
    } = props;
    
    //fetch hashtags

    if(isChanged || loading) return <CircularLoading />

    return (
        <div>
            edit hashtags
        </div>
    )
}

UserHashtagsEdit.propTypes = {
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


export default connect(mapStateToProps)(UserHashtagsEdit)
