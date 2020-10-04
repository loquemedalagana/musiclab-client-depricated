/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link, withRouter } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {List, ListItem, Tooltip, IconButton, Badge} from "@material-ui/core";

// @material-ui/icons
import { Apps, SupervisorAccount, ExitToApp, Forum, Notifications, AccountCircle } from "@material-ui/icons";

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
          id="mypage"
          title="mypage"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton
            className={classes.navLink}
          >
            <AccountCircle />
          </IconButton>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="notifications"
          title="notifications"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton
            className={classes.navLink}
          >
          <Badge badgeContent={12} color="secondary">
            <Notifications />
          </Badge>
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
            className={classes.navLink}
          >
          <Badge badgeContent={7} color="secondary">
            <Forum />
          </Badge>            
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
            className={classes.navLink}
          >
            <ExitToApp />
          </IconButton>
        </Tooltip>
      </ListItem>
    </List>
  );
}

export default withRouter(HeaderLinks);