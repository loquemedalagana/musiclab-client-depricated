import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import MediumParallaxLayout from "../../Layouts/MediumParallaxLayout";
import VideoCarouselSection from "./VideoCarouselSection/VideoCarouselSection";
//import { appDescription, appShortTitle } from "../../../app/helper/appTitle";

export const Landing = (props) => {
  const { userData } = props;

  return (
    <MediumParallaxLayout>
      {userData && <VideoCarouselSection videoCategoryTitle="My List" />}
      <VideoCarouselSection videoCategoryTitle="Jeon Inhyuk Band Official Channel" />
      <VideoCarouselSection videoCategoryTitle="Music SSeolprise by Jeon Inhyuk" />
      <VideoCarouselSection videoCategoryTitle="Hot Videos of Inhyuk" />
      <VideoCarouselSection videoCategoryTitle="Latest Videos of Inhyuk" />
    </MediumParallaxLayout>
  );
};

Landing.propTypes = {
  userData: PropTypes.object,
  userLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  userData: state.auth.userData,
  userLoading: state.auth.loading,
});

export default withRouter(connect(mapStateToProps)(Landing));
