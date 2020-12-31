import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import qs from "qs";

import { Face, Link, LocalOffer as Tag } from "@material-ui/icons";
import NoParallaxLayout from "../../Layouts/NoParallaxLayout";

import {
  GridItem,
  CustomTabs,
  //    Button,
} from "../../components/components";

import PersonalInfoEdit from "../../sections/profile/update/PersonalInfoEdit";
import SnsInfoEdit from "../../sections/profile/update/SnsInfoEdit";
import UserHashtagsEdit from "../../sections/profile/update/UserHashtagsEdit";
import { MakeSpace } from "../../app/helper/viewControllers/uiManagers";
import styles from "../../assets/jss/material-kit-react/views/pages/noParallax/UpdateProfileStyle";

const useStyles = makeStyles(styles);

const UpdateProfile = (props) => {
  const classes = useStyles();
  const { location } = props;
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  // url: profile?edit=personalinfo
  const subMenuItems = { personalinfo: 0, social: 1, tags: 2 };
  const { edit } = query;

  return (
    <NoParallaxLayout isBigCard={true}>
      <GridItem xs={12} sm={12} md={7} lg={6} className={classes.brand}>
        <MakeSpace />
        <CustomTabs
          headerColor="primary"
          tabIndex={edit ? subMenuItems[edit] : 0}
          tabs={[
            {
              tabName: "Profile",
              tabIcon: Face,
              tabContent: <PersonalInfoEdit classes={classes} />,
            },
            {
              tabName: "SNS",
              tabIcon: Link,
              tabContent: <SnsInfoEdit classes={classes} />,
            },
            {
              tabName: "Tags",
              tabIcon: Tag,
              tabContent: <UserHashtagsEdit classes={classes} />,
            },
          ]}
        />
      </GridItem>
    </NoParallaxLayout>
  );
};

UpdateProfile.propTypes = {
  isChanged: PropTypes.bool,
  location: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isChanged: state.userControl.changed,
});

export default connect(mapStateToProps)(UpdateProfile);
