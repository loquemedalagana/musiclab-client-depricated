import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import {
    Button,
    CircularLoading,
} from '../../../components/components';

export const PersonalInfoEdit = props => {

    

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
    
})

export default connect(mapStateToProps)(PersonalInfoEdit)
