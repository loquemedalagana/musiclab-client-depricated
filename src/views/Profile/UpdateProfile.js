import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import {
    Face, Link, LocalOffer as Tag
} from '@material-ui/icons'

import {
    Footer,
    GridContainer,
    GridItem,
    CustomTabs,
//    Button,
} from '../../components/components';

import PersonalInfoEdit from './UpdateProfileSections/PersonalInfoEdit';
import SnsInfoEdit from './UpdateProfileSections/SnsInfoEdit';
import UserHashtagsEdit from './UpdateProfileSections/UserHashtagsEdit';

import {defaultBgStyle} from '../../assets/jss/material-kit-react/views/background';
import styles from '../../assets/jss/material-kit-react/views/UpdateProfileStyle';

const useStyles = makeStyles(styles);

const UpdateProfile = props => {
    const classes = useStyles();

    //react=swippable-views should be added
    return (
        <div className={clsx(classes.pageHeader, defaultBgStyle().root)}>
                <div className={classes.container}>
                <GridContainer justify={window.innerWidth > 959 ? "space-between" : "center"}>
                    <GridItem xs={12} sm={12} md={7} lg={6} className={classes.brand}>
                        <h1>My Page</h1>
                            <CustomTabs
                                title='Edit'
                                headerColor="primary"
                                tabs={[
                                {
                                    tabName: "Profile",
                                    tabIcon: Face,
                                    tabContent: (
                                        <PersonalInfoEdit classes={classes}/>
                                    )
                                },
                                {
                                    tabName: "SNS",
                                    tabIcon: Link,
                                    tabContent: (
                                        <SnsInfoEdit classes={classes} />
                                    )
                                },
                                {
                                    tabName: "Tags",
                                    tabIcon: Tag,
                                    tabContent: (
                                        <UserHashtagsEdit classes={classes} />
                                    )
                                }
                                ]}
                            />                            
                        


                    </GridItem>
                </GridContainer>
            </div>
            <Footer whiteFont />
        </div>
    )
}

UpdateProfile.propTypes = {
    isChanged: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    isChanged: state.userValidation.changed,
})

export default connect(mapStateToProps)(UpdateProfile)