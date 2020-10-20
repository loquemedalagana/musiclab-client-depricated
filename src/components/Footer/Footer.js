/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import styles from "../../assets/jss/material-kit-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem button className={classes.inlineBlock}>
              <a
                href=""
                className={classes.block}
                target="_blank"
              >
                About
              </a>
            </ListItem>
            <ListItem button className={classes.inlineBlock}>
              <a
                href=""
                className={classes.block}
                target="_blank"
              >
                Blog
              </a>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()} , developed {" "}
          <Favorite className={classes.icon} /> by{" "}
          <a
            href="https://github.com/loquemedalagana"
            className={aClasses}
            target="_blank"
          >
            Mrs. Liberty
          </a>{" "}
          for a better world.
        </div>
      </div>
    </footer>
  );
}

//about => button

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
