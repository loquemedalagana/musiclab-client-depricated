import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export const UserHashtagsEdit = props => {
    return (
        <div>
            edit hashtags
        </div>
    )
}

UserHashtagsEdit.propTypes = {
    userInfo: PropTypes.object,
    loading: PropTypes.bool,
    isChanged: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    
})


export default connect(mapStateToProps)(UserHashtagsEdit)
