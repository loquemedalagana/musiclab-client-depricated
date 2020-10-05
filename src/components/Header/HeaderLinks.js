/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link, withRouter } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  List, ListItem, Badge, 
} from "@material-ui/core";

// @material-ui/icons
import { Apps, SupervisorAccount, ExitToApp, Forum, Notifications, AccountCircle } from "@material-ui/icons";

// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";
import Button from "../CustomButtons/Button.js";
import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";
const useStyles = makeStyles(styles);

const notificationCnt = 0, chatCnt = 7;

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
            <Button color = "transparent" onClick={()=>console.log('new')} className={classes.dropdownLink}>
              New
            </Button>,
            <Button color = "transparent" onClick={()=>console.log('hot')} className={classes.dropdownLink}>
              Hot
            </Button>,
            <Button color = "transparent" onClick={()=>console.log('from yada')} className={classes.dropdownLink}>
              From Yada
            </Button>,
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Admin"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={SupervisorAccount}
          dropdownList={[
            <Button color = "transparent" onClick={()=>console.log('user list')} className={classes.dropdownLink}>
              User List
            </Button>,
            <Button color = "transparent" onClick={()=>console.log('dashboard')} className={classes.dropdownLink}>
              Dashboard
            </Button>,
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="mypage"
          badgeContent={notificationCnt+chatCnt}
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={AccountCircle}
          dropdownList={[
            <Button color = "transparent" onClick={()=>console.log('my profile')} className={classes.dropdownLink}>
              <AccountCircle/>
              My Profile
            </Button>,
            <Button color = "transparent" onClick={()=>console.log('notifications')} className={classes.dropdownLink}>
              <Badge 
                badgeContent={notificationCnt} 
                variant='dot' 
                color="secondary"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <Notifications />
              </Badge>
              Notifications
            </Button>,
            <Button color = "transparent" onClick={()=>console.log('private msg')} className={classes.dropdownLink}>
              <Badge 
                badgeContent={chatCnt} 
                variant='dot' 
                color="secondary"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <Forum />                
              </Badge>
              Private Messages              
            </Button>,
            <Button color = "transparent" onClick={()=>console.log('logout')} className={classes.dropdownLink}>
              <ExitToApp />
              Logout              
            </Button>
          ]}
        />
      </ListItem>
    </List>
  );
}

export default withRouter(HeaderLinks);