import React, {useState, useEffect} from "react";
import { connect } from 'react-redux';

import classNames from "classnames";
import {withRouter, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

import { makeStyles } from "@material-ui/core/styles";
import { IconButton, List, ListItem } from '@material-ui/core';

import {
    LocalOffer as Tag, MusicVideoRounded, Favorite,
    DescriptionRounded as Post,
    Edit, Cloud as SoundCloud,
    Home as Blog, Twitter, Facebook, Instagram, YouTube
} from '@material-ui/icons';

import {
    Footer,
//    Button,
    GridContainer,
    GridItem,
    NavPills,
    Parallax,
    LinearLoading,
} from '../../components/components';

import NotFound from '../Error/NotFound';

import defaultImg from '../../assets/images/dolphin_profile.png';

import studio1 from "./ProfileSections/examples/studio-1.jpg";
import studio2 from "./ProfileSections/examples/studio-2.jpg";
import studio3 from "./ProfileSections/examples/studio-3.jpg";
import studio4 from "./ProfileSections/examples/studio-4.jpg";
import studio5 from "./ProfileSections/examples/studio-5.jpg";
import work1 from "./ProfileSections/examples/olu-eletu.jpg";
import work2 from "./ProfileSections/examples/clem-onojeghuo.jpg";
import work3 from "./ProfileSections/examples/cynthia-del-rio.jpg";
import work4 from "./ProfileSections/examples/mariya-georgieva.jpg";
import work5 from "./ProfileSections/examples/clem-onojegaw.jpg";

import styles from "../../assets/jss/material-kit-react/views/ProfileStyle";
import { smallParallaxStyle } from '../../assets/jss/material-kit-react/views/background';
import { getDateKor } from '../../utils/functions';

const useStyles = makeStyles(styles);

//https://stackoverflow.com/questions/58924617/componentwillreceiveprops-has-been-renamed
//test user id 5f3d26926b0ee109c1220711  5f4f674082d649d4258f2fa7   5f49fdc87a0c7a58a4f88367

//print social props
const PrintSocialLinks = social => {
    if(!social) return null;

    const getIcon = key => {
        switch (key) {
            case 'youtube':
                return <YouTube />
            case 'facebook':
                return <Facebook />
            case 'twitter':
                return <Twitter />
            case 'instagram':
                return <Instagram />
            case 'soundcloud':
                return <SoundCloud />
            default:
                return <Blog />
        }
    }

    //color primary, href -> social명
    const data = Object.keys(social).map(key => {
        return (<ListItem 
            key={key} 
            component='a' 
            href={social[key]}
            target="_blank"
        >
            {getIcon(key)}
        </ListItem>)
    });

    //console.log(data);

    return <List>
        {data}
    </List>
}

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
        history,
        curUserId, 
    } = props;

    const targetUserId = match.params.userid; //useEffect 안에서 아이디가 있음.
    const isSame = curUserId === targetUserId;
    const ENDPOINT = `/api/profiles/${targetUserId}`;
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetch(ENDPOINT, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(resultData => {
            setData(resultData);
        })
        .catch(err => setError(err));

    }, [ENDPOINT, match, curUserId, isAdmin]);

    console.log(data, error);

    const thumbnail = data ? (data.userData.thumbnail ? data.userData.thumbnail : undefined) : undefined;

    if(!data && !error) return <LinearLoading />
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
                            {isSame ? (
                                <IconButton color='primary' onClick={() => history.push(`/modify/profile`)}>
                                    <Edit />
                                </IconButton>
                            ) : (
                                <IconButton color='secondary' onClick={null}>
                                    <Favorite />
                                </IconButton>
                            )}
                            </h3>
                            {(isAdmin || isSame ) ? (
                                <>
                                <h6>{`${data.userData.name.familyName}${data.userData.name.givenName}`}</h6>
                                <h6>{`${getDateKor(data.userData.birthday)}생`}</h6>
                                </>
                            ) : <h6>  </h6>}

                        </div>
                        <GridContainer justify="center">
                        {PrintSocialLinks(data.userData.social)}
                        </GridContainer>
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
                        tabButton: "Tags",
                        tabIcon: Tag,
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
                        tabButton: "Liked Videos",
                        tabIcon: MusicVideoRounded,
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
                        tabButton: "Written Posts",
                        tabIcon: Post,
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

export default withRouter(connect(mapStateToProps)(React.memo(Profile)));

//error memo
//https://react.vlpt.us/basic/16-useEffect.html