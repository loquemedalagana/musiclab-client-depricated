import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
    Home as Blog, Twitter, Facebook, Instagram, YouTube
} from '@material-ui/icons';

export const SnsInfoEdit = props => {
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
    
})

export default connect(mapStateToProps)(SnsInfoEdit)
