/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { withRouter } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
    List, ListItem, Tooltip
} from "@material-ui/core";

// core components
import Button from "../CustomButtons/Button.js";
import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";
const useStyles = makeStyles(styles);

const HeaderLinksNotLoggedIn = (props) => {
    const {
        history,
    } = props;
    const classes = useStyles();
    return (
        <List className={classes.list}>
        <ListItem className={classes.listItem}>
            <Button 
                color='transparent'
                className={classes.navLink}
                onClick={() => history.push('/login')}
            >
                Login
            </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
            <Button 
                color='transparent'
                className={classes.navLink}
                onClick={() => history.push('/signup')}
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

export default withRouter(HeaderLinksNotLoggedIn);