import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { smallParallaxStyle } from "../../assets/jss/material-kit-react/views/background";
import { Footer, Parallax } from "../../components/components";

PostListPage.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
};

const PostListPage = (props) => {
  return (
    <>
      <Parallax small filter style={smallParallaxStyle().root} />
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(PostListPage);
