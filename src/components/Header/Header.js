import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Hidden,
  Drawer,
} from "@material-ui/core";

// @material-ui/icons
import {
  QueueMusic as Menu,
  ArrowBackIos,
  ArrowForwardIos,
  HomeSharp,
} from "@material-ui/icons";

import SearchIconMobile from "./SearchIconMobile";

// core components
import styles from "../../assets/jss/material-kit-react/components/headerStyle.js";

const useStyles = makeStyles(styles);

function Header(props) {
  const classes = useStyles();
  const { mobileOpen, setMobileOpen, location } = props;
  React.useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
  });
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const headerColorChange = () => {
    const { color, changeColorOnScroll } = props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  };
  const {
    color,
    rightLinks,
    leftLinks,
    brand,
    fixed,
    absolute,
    history,
  } = props;
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed,
  });

  //console.log(location);

  const brandComponent = (
    <>
      <Hidden mdUp implementation="js">
        {location.pathname !== "/" && (
          <IconButton
            className={classes.title}
            onClick={() => history.goBack()}
          >
            <ArrowBackIos />
          </IconButton>
        )}
        <IconButton
          className={classes.title}
          onClick={() => history.goForward()}
        >
          <ArrowForwardIos />
        </IconButton>
        <IconButton className={classes.title} onClick={() => history.push("/")}>
          <HomeSharp />
        </IconButton>
      </Hidden>
      <Hidden smDown implementation="css">
        <Button className={classes.title} onClick={() => history.push("/")}>
          {brand}
        </Button>
      </Hidden>
    </>
  );

  return (
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container}>
        {leftLinks !== undefined ? brandComponent : null}
        <div className={classes.flex}>
          {leftLinks !== undefined ? (
            <Hidden smDown implementation="css">
              {leftLinks}
            </Hidden>
          ) : (
            brandComponent
          )}
        </div>
        <Hidden smDown implementation="css">
          {rightLinks}
        </Hidden>
        {/*--------모바일 매뉴, 여기다 알림 뱃지 추가--------*/}
        <Hidden mdUp>
          <SearchIconMobile color="inherit" />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={handleDrawerToggle}
        >
          <div className={classes.appResponsive}>
            {leftLinks}
            {rightLinks}
          </div>
        </Drawer>
      </Hidden>
    </AppBar>
  );
}

Header.defaultProp = {
  color: "white",
};

Header.propTypes = {
  mobileOpen: PropTypes.bool,
  setMobileOpen: PropTypes.func,
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark",
  ]),
  rightLinks: PropTypes.node,
  leftLinks: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "dark",
    ]).isRequired,
  }),
  history: PropTypes.object,
  location: PropTypes.object,
};

export default withRouter(Header);
