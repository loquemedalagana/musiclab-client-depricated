import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

// page style
import styles from "../../../../assets/jss/material-kit-react/views/pages/smallParallax/videoListByKeywordsStyle";
import { GridContainer } from "../../../../components/components";
const useStyles = makeStyles(styles);

const RenderEmptyList = (props) => {
  const classes = useStyles();
  const { children } = props;
  return (
    <GridContainer justify="center" className={classes.emptyContainer}>
      {children}
    </GridContainer>
  );
};

RenderEmptyList.propTypes = {
  children: PropTypes.node,
};

export default RenderEmptyList;
