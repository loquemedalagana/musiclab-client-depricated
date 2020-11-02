/*eslint-disable*/
import React, {useState} from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
import About from '../../views/Modals/About';
import NotAvailable from '../../views/Modals/NotAvailable';
import styles from "../../assets/jss/material-kit-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;

  const [aboutOpen, setAboutOpen] = useState(false);
  const [notAvailableOpen, setNotAvailableOpen] = useState(false);

  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <>
    <About 
      open={aboutOpen}
      onClose={() => setAboutOpen(false)}
    />
    <NotAvailable 
      open={notAvailableOpen}
      onClose={() => setNotAvailableOpen(false)}
    />
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem button 
              className={classes.inlineBlock} 
              onClick={() => setAboutOpen(true)}
            >
              <a
                className={classes.block}
              >
                About
              </a>
            </ListItem>
            <ListItem button 
              className={classes.inlineBlock}
              onClick={() => setNotAvailableOpen(true)}
            >
              <a
                className={classes.block}
              >
                Tech Blog
              </a>
            </ListItem>
            <ListItem button 
              className={classes.inlineBlock}
              onClick={() => setNotAvailableOpen(true)}
            >
              <a
                className={classes.block}
              >
                WIKI
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
    </>
  );
}

//about => button

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
