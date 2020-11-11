import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export const PersonalInfoEdit = props => {
    return (
        <div>
            edit personal info
        </div>
    )
}

PersonalInfoEdit.propTypes = {
    userInfo: PropTypes.object,
}

const mapStateToProps = (state) => ({
    
})

export default connect(mapStateToProps)(PersonalInfoEdit)
