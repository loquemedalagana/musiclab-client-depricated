import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export const UserHashtagsEdit = () => {
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

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHashtagsEdit)
