import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../../../assets/jss/material-kit-react/views/pages/smallParallax/smallParallaxPageStyle";
import { GridContainer } from "../../../../components/components";

const useStyles = makeStyles(styles);

const EmptyContainer = (props) => {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <GridContainer
      justify="center"
      className={classes.emptyContainer}
      {...rest}
    >
      <h2>영상 리스트가 비어 있습니다.</h2>
    </GridContainer>
  );
};

EmptyContainer.propTypes = {
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default EmptyContainer;
