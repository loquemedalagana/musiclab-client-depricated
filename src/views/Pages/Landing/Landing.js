import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import MediumParallaxLayout from "../../Layouts/MediumParallaxLayout";
import VideoCarouselSection from "./VideoCarouselSection/VideoCarouselSection";
//import { appDescription, appShortTitle } from "../../../app/helper/appTitle";

export const Landing = (props) => {
  const { userData, userLoading } = props;

  return (
    <MediumParallaxLayout>
      {userData && !userLoading && userData.points >= 0 ? (
        <VideoCarouselSection categoryTitle="My List" userData={userData} />
      ) : null}

      <VideoCarouselSection categoryTitle="Jeon Inhyuk Band Official Channel" />
      <VideoCarouselSection categoryTitle="Music SSeolprise by Jeon Inhyuk" />
      <VideoCarouselSection categoryTitle="Hot Videos of Inhyuk" />
      <VideoCarouselSection categoryTitle="Latest Videos of Inhyuk" />
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
