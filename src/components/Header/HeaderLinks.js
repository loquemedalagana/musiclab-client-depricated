/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
// react components for routing our app without refresh
import { Link, withRouter } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {List, ListItem, Tooltip, IconButton} from "@material-ui/core";

// @material-ui/icons
import { Apps, SupervisorAccount } from "@material-ui/icons";

// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";
import Button from "../CustomButtons/Button.js";

import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

const HeaderLinks = (props) => {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="View"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/" className={classes.dropdownLink}>
              Latest
            </Link>,
            <Link to="/" className={classes.dropdownLink}>
              Hot
            </Link>,
            <Link to="/" className={classes.dropdownLink}>
              From Yada
            </Link>,
          ]}
        />
      </ListItem>

      <ListItem className={classes.listItem}>
        <Button          
          color="transparent"
          className={classes.navLink}
        >
          <SupervisorAccount className={classes.icons} /> Admin
        </Button>
      </ListItem>

      <ListItem className={classes.listItem}>
        <Tooltip
          id="notifications"
          title="notifications"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </IconButton>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="private-messages"
          title="private messages"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </IconButton>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="logout"
          title="logout"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </IconButton>
        </Tooltip>
      </ListItem>
    </List>
  );
}

export default withRouter(HeaderLinks);