import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import { Face, Link, LocalOffer as Tag } from "@material-ui/icons";
import NoParallaxLayout from "../../Layouts/NoParallaxLayout";

import {
  GridItem,
  CustomTabs,
  //    Button,
} from "../../../components/components";

import PersonalInfoEdit from "./UpdateProfileSections/PersonalInfoEdit";
import SnsInfoEdit from "./UpdateProfileSections/SnsInfoEdit";
import UserHashtagsEdit from "./UpdateProfileSections/UserHashtagsEdit";
import { MakeSpace } from "../../../app/helper/responsiveUI/uiManagers";
import styles from "../../../assets/jss/material-kit-react/views/pages/noParallax/UpdateProfileStyle";

const useStyles = makeStyles(styles);

const UpdateProfile = () => {
  const classes = useStyles();
  //react=swippable-views should be added
  return (
    <NoParallaxLayout isBigCard={true}>
      <GridItem xs={12} sm={12} md={7} lg={6} className={classes.brand}>
        <MakeSpace />
        <CustomTabs
          headerColor="primary"
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
};

const mapStateToProps = (state) => ({
  isChanged: state.userValidationAndUpdate.changed,
});

export default connect(mapStateToProps)(UpdateProfile);
