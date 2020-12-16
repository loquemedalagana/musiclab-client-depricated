import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";

import styles from "../../assets/jss/material-kit-react/views/layouts/mediumParallaxLayoutStyle";
import { mainParallaxStyle } from "../../assets/jss/material-kit-react/views/layouts/background";
import {
  Footer,
  GridContainer,
  GridItem,
  Parallax,
} from "../../components/components";
import { appDescription, appShortTitle } from "../../app/helper/appTitle";
import classNames from "classnames";

const useStyles = makeStyles(styles);

const MediumParallaxLayout = (props) => {
  const classes = useStyles();
  const { children } = props;

  return (
    <>
      <Parallax className={mainParallaxStyle().root}>
        <div className={classes.container}>
          <GridContainer type="parallax">
            <GridItem xs={12} sm={12} md={6}>
              <div className={classes.brand}>
                <h1 className={classes.title}>{appShortTitle}</h1>
                <h3 className={classes.subtitle}>{appDescription}</h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        {children}
      </div>
      <Footer />
    </>
  );
};

MediumParallaxLayout.propTypes = {
  children: PropTypes.node,
};

export default MediumParallaxLayout;
