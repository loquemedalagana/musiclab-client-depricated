import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  IconButton,
} from '@material-ui/core';

import {
  Search,
} from '@material-ui/icons';

export const SearchIconMobile = props => {
  const {
    color,
    onClick,
  } = props;
  return (
      <IconButton
        aria-label="open drawer"
        color={color}
        onClick={onClick}
      >
        <Search />
      </IconButton>
  )
}

SearchIconMobile.propTypes = {
  color: PropTypes.oneOf([
    "inherit",

  ]),
  onClick: PropTypes.func,

}

const mapStateToProps = (state) => ({
    
})


export default connect(mapStateToProps)(SearchIconMobile)
