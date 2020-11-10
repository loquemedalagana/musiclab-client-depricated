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
    prop: PropTypes
}

const mapStateToProps = (state) => ({
    
})


export default connect(mapStateToProps)(UserHashtagsEdit)
