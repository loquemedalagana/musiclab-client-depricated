import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

PostListPage.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
};

const PostListPage = (props) => {
  return <div></div>;
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(PostListPage);
