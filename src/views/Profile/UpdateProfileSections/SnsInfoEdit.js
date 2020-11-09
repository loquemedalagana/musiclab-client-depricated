import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export const SnsInfoEdit = () => {
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

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(SnsInfoEdit)
