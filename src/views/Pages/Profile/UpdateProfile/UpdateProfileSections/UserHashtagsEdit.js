import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { setAlertMsg } from "../../../../../app/store/alert";

import {
  CircularLoading,
  //GridContainer,
} from "../../../../../components/components";

export const UserHashtagsEdit = (props) => {
  const {
    classes,
    //        userInfo,
    loading,
    isChanged,
  } = props;

  //fetch hashtags

  if (isChanged || loading) return <CircularLoading />;

  return <div className={classes.tabBody}>edit hashtags</div>;
};

UserHashtagsEdit.propTypes = {
  setAlertMsg: PropTypes.func,
  classes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  userInfo: PropTypes.object,
  loading: PropTypes.bool,
  isChanged: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  userInfo: state.auth.userData,
  isChanged: state.userValidationAndUpdate.changed,
});

export default connect(mapStateToProps, { setAlertMsg })(UserHashtagsEdit);
