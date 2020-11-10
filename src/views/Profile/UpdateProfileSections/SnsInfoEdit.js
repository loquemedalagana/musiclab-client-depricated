import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export const SnsInfoEdit = props => {
    return (
        <div>
            edit profile
        </div>
    )
}

SnsInfoEdit.propTypes = {
    prop: PropTypes
}

const mapStateToProps = (state) => ({
    
})

export default connect(mapStateToProps)(SnsInfoEdit)
