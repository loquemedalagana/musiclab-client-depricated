import React from "react";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// style components
import { makeStyles } from "@material-ui/core/styles";
import { GridContainer, GridItem } from "../../../../components/components";
import styles from "../../../../assets/jss/material-kit-react/views/fragments/tagContainerStyle";

const useStyles = makeStyles(styles);

const YoutubeTagContainer = (props) => {
  const classes = useStyles();
  // useselector 사용

  // 쿼리 분석해서 영상 리스트 띄어줌

  return (
    <GridContainer
      justify="center"
      id={"youtube-tag-container"}
      className={classes.root}
    >
      <GridItem xs={12} sm={12} md={8}>
        <h2>이 부분 태그별로 나열됨(리듀서 사용)</h2>
        <h3>검색창 여기 있음</h3>
        <h3>ex. #Yada #진혼 etc</h3>
      </GridItem>
    </GridContainer>
  );
};

YoutubeTagContainer.propTypes = {
  history: PropTypes.object,
};

export default withRouter(YoutubeTagContainer);
