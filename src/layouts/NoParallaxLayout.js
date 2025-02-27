import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import classNames from "classnames";
import clsx from "clsx";
import {
  Footer,
  GridContainer,
  Header,
  HeaderLinks,
} from "../components/components";
import styles from "../assets/jss/material-kit-react/views/layouts/noParallaxLayoutStyle";
import { defaultBgStyle } from "../assets/jss/material-kit-react/views/layouts/background";
import { isDesktop } from "../app/helper/viewControllers/uiManagers";
import { appTitle } from "../app/helper/appTitle";

const useStyles = makeStyles(styles);

const NoParallaxLayout = (props) => {
  const classes = useStyles();
  const { children, isBigCard, ...rest } = props;

  const [mobileOpen, setMobileOpen] = useState(false);

  const cardContainerClasses = classNames(
    classes.container,
    isBigCard ? classes.bigCardContainer : classes.smallCardContainer
  );

  return (
    <>
      <Header
        color="transparent"
        brand={appTitle}
        rightLinks={
          <HeaderLinks mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        }
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "info",
        }}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        {...rest}
      />
      <div className={clsx(classes.pageHeader, defaultBgStyle().root)}>
        <div className={cardContainerClasses}>
          <GridContainer justify={isDesktop ? "space-between" : "center"}>
            {children}
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </>
  );
};

NoParallaxLayout.propTypes = {
  children: PropTypes.node,
  isBigCard: PropTypes.bool,
};

export default NoParallaxLayout;
