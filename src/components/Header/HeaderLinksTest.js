import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle";
import { List, ListItem, Tooltip } from "@material-ui/core";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import { Apps, VideoLibrarySharp } from "@material-ui/icons";
import Button from "../CustomButtons/Button";
import PropTypes from "prop-types";

const useStyles = makeStyles(styles);

const HeaderLinks = (props) => {
  const classes = useStyles();
  const { setMobileOpen, history } = props;

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="VIDEOS"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={VideoLibrarySharp}
          dropdownList={[
            <Button
              color="transparent"
              onClick={() => console.log("my list")}
              className={classes.dropdownLink}
            >
              My List
            </Button>,
            <Button
              color="transparent"
              onClick={() => console.log("my list")}
              className={classes.dropdownLink}
            >
              Members' cover videos
            </Button>,
            <Button
              color="transparent"
              onClick={() => console.log("new")}
              className={classes.dropdownLink}
            >
              Music SSeolprise
            </Button>,
            <Button
              color="transparent"
              onClick={() => {
                history.push(`/officialvideolist/jihbandofficial`);
                setMobileOpen(false);
              }}
              className={classes.dropdownLink}
            >
              Jeon Inhyuk Band official
            </Button>,
            <Button
              color="transparent"
              onClick={() => {
                history.push(`/videolistbykeywords`);
                setMobileOpen(false);
              }}
              className={classes.dropdownLink}
            >
              Search videos of Yada
            </Button>,
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="POSTS"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Button
              color="transparent"
              onClick={() => console.log("new")}
              className={classes.dropdownLink}
            >
              New
            </Button>,
            <Button
              color="transparent"
              onClick={() => console.log("hot")}
              className={classes.dropdownLink}
            >
              Hot
            </Button>,
            <Button
              color="transparent"
              onClick={() => console.log("from yada")}
              className={classes.dropdownLink}
            >
              From Yada Jeon Inhyuk
            </Button>,
          ]}
        />
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
};

HeaderLinks.propTypes = {
  setMobileOpen: PropTypes.func,
  history: PropTypes.object,
};

export default HeaderLinks;
