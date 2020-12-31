import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import qs from "qs";
import { makeStyles } from "@material-ui/core/styles";

// sub components
import SmallParallaxLayout from "../../../Layouts/SmallParallaxLayout";
import YoutubeTagContainer from "../../../sections/youtube/YoutubeTagContainer";
import ViewVideoListSection from "../../../sections/youtube/ViewVideoListSection";
import FooterMenu from "../../../sections/navigations/FooterMenu";

// route
import { NOT_FOUND_ROUTE } from "../../../routes/params/error";

// page style
import styles from "../../../assets/jss/material-kit-react/views/pages/smallParallax/smallParallaxPageStyle";

const useStyles = makeStyles(styles);

export const YoutubeVideoListByTags = (props) => {
  const classes = useStyles();
  const { location, match } = props;
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const { category } = query;
  console.log(query); // 쿼리에 맞게 아래에 결과 띄운다.

  if (match.params.search !== "search" && match.params.search !== undefined)
    return <Redirect to={NOT_FOUND_ROUTE} />;

  return (
    <>
      <FooterMenu />
      <SmallParallaxLayout>
        <YoutubeTagContainer />
        <ViewVideoListSection
          type="searchresult"
          category={!category ? "etc" : category}
          match={match}
        />
      </SmallParallaxLayout>
    </>
  );
};

YoutubeVideoListByTags.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
};

export default YoutubeVideoListByTags;
