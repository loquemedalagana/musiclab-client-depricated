import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import classNames from "classnames";

import { smallParallaxStyle } from "../../assets/jss/material-kit-react/views/layouts/background";
import styles from "../../assets/jss/material-kit-react/views/layouts/smallParallaxLayoutStyle";
import {
  Footer,
  Header,
  HeaderLinks,
  HeaderLinksNotLoggedIn,
  Parallax,
} from "../../components/components";
import { appTitle } from "../../app/helper/appTitle";

const useStyles = makeStyles(styles);

const SmallParallaxLayout = (props) => {
  const classes = useStyles();
  const { children, thumbnail, auth, ...rest } = props;

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <Header
        color="transparent"
        brand={appTitle}
        rightLinks={
          auth ? (
            <HeaderLinks
              mobileOpen={mobileOpen}
              setMobileOpen={setMobileOpen}
            />
          ) : (
            <HeaderLinksNotLoggedIn
              mobileOpen={mobileOpen}
              setMobileOpen={setMobileOpen}
            />
          )
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
  auth: PropTypes.bool,
  thumbnail: PropTypes.string,
};

const mapStateToProps = (state) => ({
  auth: state.user.auth,
});

export default connect(mapStateToProps)(SmallParallaxLayout);
