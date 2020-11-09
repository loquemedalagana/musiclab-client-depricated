import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export const PersonalInfoEdit = () => {
    return (
        <div>
            edit personal info
        </div>
    )
}

PersonalInfoEdit.propTypes = {
    prop: PropTypes
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfoEdit)
