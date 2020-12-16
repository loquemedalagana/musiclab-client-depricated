import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import classNames from "classnames";

import { smallParallaxStyle } from "../../assets/jss/material-kit-react/views/layouts/background";
import styles from "../../assets/jss/material-kit-react/views/layouts/smallParallaxLayoutStyle";
import { Footer, Parallax } from "../../components/components";

const useStyles = makeStyles(styles);

const SmallParallaxLayout = (props) => {
  const classes = useStyles();
  const { children, thumbnail } = props;
  return (
    <>
      <Parallax
        small
        filter
        style={
          thumbnail
            ? smallParallaxStyle(thumbnail).root
            : smallParallaxStyle().root
        }
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>{children}</div>
      </div>
      <Footer />
    </>
  );
};

SmallParallaxLayout.propTypes = {
  children: PropTypes.node,
  thumbnail: PropTypes.string,
  profileHeader: PropTypes.node,
};

export default SmallParallaxLayout;
