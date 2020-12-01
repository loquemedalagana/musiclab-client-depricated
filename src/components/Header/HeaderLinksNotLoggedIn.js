/*eslint-disable*/
import React from "react";
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
// react components for routing our app without refresh
import { withRouter } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  List, ListItem, Tooltip
} from "@material-ui/core";

import { 
  VideoLibrarySharp,
} from "@material-ui/icons";

// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";
import Button from "../CustomButtons/Button.js";
import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";
const useStyles = makeStyles(styles);

const HeaderLinksNotLoggedIn = (props) => {
  const {
    history,
    setMobileOpen,
  } = props;
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            buttonText="VIDEOS"
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            buttonIcon={VideoLibrarySharp}
            dropdownList={[
              <Button color = "transparent" onClick={()=>console.log('new')} className={classes.dropdownLink}>
                Music SSeolprise
              </Button>,
              <Button color = "transparent" onClick={()=> history.push('/officialvideolist/jihbandofficial')} className={classes.dropdownLink}>
                Jeon Inhyuk Band official
              </Button>,
              <Button color = "transparent" onClick={()=>console.log('new')} className={classes.dropdownLink}>
                Search videos of Yada
              </Button>,
            ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button 
          color='transparent'
          className={classes.navLink}
          onClick={() => {
            history.push('/login');
            setMobileOpen(false);
          }}
        >
          Login
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button 
          color='transparent'
          className={classes.navLink}
          onClick={() => {
            history.push('/signup');
            setMobileOpen(false);
          }}
        >
          Sign up
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="youtube"
          title="Subscribe us"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.youtube.com/channel/UChNtl7wRLF6x4B4fp7KCyhQ"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-youtube"} />
          </Button>
        </Tooltip>
      </ListItem>        
    </List>
  );
}

HeaderLinksNotLoggedIn.propTypes = {
  setMobileOpen: PropTypes.func,
  history: PropTypes.object,
}

export default withRouter(HeaderLinksNotLoggedIn);