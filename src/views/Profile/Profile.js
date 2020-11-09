import React from "react";
import { connect } from 'react-redux';
import fetcher from '../../app/fetcher';
import useSWR from 'swr';
// nodejs library that concatenates classes
import classNames from "classnames";
import {withRouter, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
//import clsx from 'clsx';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from '@material-ui/core';

// @material-ui/icons
import {
    Camera, Palette, Favorite, Edit,
} from '@material-ui/icons';

import {
    Footer,
    Button,
    GridContainer,
    GridItem,
    NavPills,
    Parallax,
    LinearLoading,
//    CircularLoading,
} from '../../components/components';

import NotFound from '../Error/NotFound';

import defaultImg from '../../assets/images/dolphin_profile.png';

import studio1 from "./temp/examples/studio-1.jpg";
import studio2 from "./temp/examples/studio-2.jpg";
import studio3 from "./temp/examples/studio-3.jpg";
import studio4 from "./temp/examples/studio-4.jpg";
import studio5 from "./temp/examples/studio-5.jpg";
import work1 from "./temp/examples/olu-eletu.jpg";
import work2 from "./temp/examples/clem-onojeghuo.jpg";
import work3 from "./temp/examples/cynthia-del-rio.jpg";
import work4 from "./temp/examples/mariya-georgieva.jpg";
import work5 from "./temp/examples/clem-onojegaw.jpg";

import styles from "../../assets/jss/material-kit-react/views/ProfileStyle";
import { smallParallaxStyle } from '../../assets/jss/material-kit-react/views/background';
import { getDateKor } from '../../utils/functions';

const useStyles = makeStyles(styles);

//https://stackoverflow.com/questions/58924617/componentwillreceiveprops-has-been-renamed
//test user id 5f3d26926b0ee109c1220711  5f4f674082d649d4258f2fa7   5f49fdc87a0c7a58a4f88367

const Profile = (props) => {
    const classes = useStyles();
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );

    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

    const { 
        match,
        isAdmin,
//        history,
        curUserId,
    } = props;
    const targetUserId = match.params.userid;
    const isSame = curUserId === targetUserId;

    const {data, error} = useSWR(`/api/profiles/${targetUserId}`, fetcher);
    const targetUserLoading = !data && !error;
    const thumbnail = data ? (data.userData.thumbnail ? data.userData.thumbnail : undefined) : undefined;

    console.log(data, error);

    if(targetUserLoading) return <LinearLoading />
    if(error)  return <Redirect to = "/notfound" />;

    return !error ? (
        <>
        <Parallax small filter style={thumbnail ? smallParallaxStyle(thumbnail).root : smallParallaxStyle().root} />        
        <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                    <div className={classes.profile}>
                    <div>
                        <img src={data.userData.image ? data.userData.image : defaultImg} alt="..." className={imageClasses} />
                    </div>
                    <div className={classes.name}>
                        <h3 className={classes.title}>{data.userData.displayName}
                        <IconButton color='primary'>
                        <Edit />
                        </IconButton>
                        </h3>
                        {(isAdmin || isSame ) ? (
                            <>
                            <h6>{`${data.userData.name.familyName}${data.userData.name.givenName}`}</h6>
                            <h6>{`${getDateKor(data.userData.birthday)}생`}</h6>
                            </>
                        ) : <h6>  </h6>}
                            {
                                //icon button sns 있으면 누르기
                            }

                        <Button 
                            href={data.userData.social && data.userData.social.instagram} 
                            color={data.userData.social && data.userData.social.instagram && "primary"}
                            justIcon className={classes.margin5}
                        >
                        <i className={"fab fa-instagram"} />
                        </Button>
                        <Button 
                            href={data.userData.social && data.userData.social.facebook} 
                            color={data.userData.social && data.userData.social.facebook && "primary"}
                            target="_blank"
                            justIcon className={classes.margin5}
                        >
                        <i className={"fab fa-facebook"} />
                        </Button>
                        <Button 
                            href={data.userData.social && data.userData.social.youtube} 
                            color={data.userData.social && data.userData.social.youtube && "primary"}
                            target="_blank"
                            justIcon className={classes.margin5}
                        >
                        <i className={"fab fa-youtube"} />
                        </Button>
                        <Button 
                            href={data.userData.social && data.userData.social.twitter} 
                            color={data.userData.social && data.userData.social.twitter && "primary"}
                            target="_blank"
                            justIcon className={classes.margin5}
                        >
                        <i className={"fab fa-twitter"} />
                        </Button>
                    </div>
                    </div>
                </GridItem>
                </GridContainer>
                <div className={classes.description}>
                <p>
                    {data.userData.description}{" "}
                </p>
                </div>
                <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                    <NavPills
                    alignCenter
                    color="primary"
                    tabs={[
                        {
                        tabButton: "Studio",
                        tabIcon: Camera,
                        tabContent: (
                            <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                                <img
                                alt="..."
                                src={studio1}
                                className={navImageClasses}
                                />
                                <img
                                alt="..."
                                src={studio2}
                                className={navImageClasses}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <img
                                alt="..."
                                src={studio5}
                                className={navImageClasses}
                                />
                                <img
                                alt="..."
                                src={studio4}
                                className={navImageClasses}
                                />
                            </GridItem>
                            </GridContainer>
                        )
                        },
                        {
                        tabButton: "Work",
                        tabIcon: Palette,
                        tabContent: (
                            <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                                <img
                                alt="..."
                                src={work1}
                                className={navImageClasses}
                                />
                                <img
                                alt="..."
                                src={work2}
                                className={navImageClasses}
                                />
                                <img
                                alt="..."
                                src={work3}
                                className={navImageClasses}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <img
                                alt="..."
                                src={work4}
                                className={navImageClasses}
                                />
                                <img
                                alt="..."
                                src={work5}
                                className={navImageClasses}
                                />
                            </GridItem>
                            </GridContainer>
                        )
                        },
                        {
                        tabButton: "Favorite",
                        tabIcon: Favorite,
                        tabContent: (
                            <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                                <img
                                alt="..."
                                src={work4}
                                className={navImageClasses}
                                />
                                <img
                                alt="..."
                                src={studio3}
                                className={navImageClasses}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <img
                                alt="..."
                                src={work2}
                                className={navImageClasses}
                                />
                                <img
                                alt="..."
                                src={work1}
                                className={navImageClasses}
                                />
                                <img
                                alt="..."
                                src={studio1}
                                className={navImageClasses}
                                />
                            </GridItem>
                            </GridContainer>
                        )
                        }
                    ]}
                    />
                </GridItem>
                </GridContainer>
            </div>            
        
        </div>
        <Footer />
        </>
    ) : <NotFound />;
}

Profile.propTypes = {
    props: PropTypes.object,
    match: PropTypes.object,
    history: PropTypes.object,
    curUserId: PropTypes.string,
    isAdmin: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    curUserId: state.auth.userData ? state.auth.userData._id : undefined,
    isAdmin: state.auth.userData ? state.auth.userData.isAdmin : false,
});

export default withRouter(connect(mapStateToProps)(Profile));