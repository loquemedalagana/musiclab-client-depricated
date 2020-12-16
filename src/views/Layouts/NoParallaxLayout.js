import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import classNames from "classnames";
import clsx from "clsx";
import { Footer, GridContainer } from "../../components/components";
import styles from "../../assets/jss/material-kit-react/views/layouts/noParallaxLayoutStyle";
import { defaultBgStyle } from "../../assets/jss/material-kit-react/views/layouts/background";
import { isDesktop } from "../../app/helper/responsiveUI/uiManagers";

const useStyles = makeStyles(styles);

const NoParallaxLayout = (props) => {
  const classes = useStyles();
  const { children, isBigCard } = props;
  const cardContainerClasses = classNames(
    classes.container,
    isBigCard ? classes.bigCardContainer : classes.smallCardContainer
  );

  return (
    <div className={clsx(classes.pageHeader, defaultBgStyle().root)}>
      <div className={cardContainerClasses}>
        <GridContainer justify={isDesktop ? "space-between" : "center"}>
          {children}
        </GridContainer>
      </div>
      <Footer whiteFont />
    </div>
  );
};

NoParallaxLayout.propTypes = {
  children: PropTypes.node,
  isBigCard: PropTypes.bool,
};

export default NoParallaxLayout;
