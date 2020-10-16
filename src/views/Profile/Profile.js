import React from "react";
import { connect } from 'react-redux';
// nodejs library that concatenates classes
import classNames from "classnames";
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
//import clsx from 'clsx';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components

import {
    Footer,
    Button,
    GridContainer,
    GridItem,
    NavPills,
    Parallax,
} from '../../components/components';

import profile from "./temp/faces/christian.jpg";

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
import { profileParallaxStyle } from '../../assets/jss/material-kit-react/views/background';

const useStyles = makeStyles(styles);

const Profile = (props) => {
    const classes = useStyles();
    const { 
        history,
//        ...rest 
    } = props;

    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );

    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);


    return (
        <div>
        <Parallax small filter className={profileParallaxStyle().root} />
        <div className={classNames(classes.main, classes.mainRaised)}>
            <div>
            <div className={classes.container}>
                <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                    <div className={classes.profile}>
                    <div>
                        <img src={profile} alt="..." className={imageClasses} />
                    </div>
                    <div className={classes.name}>
                        <h3 className={classes.title}>Christian Louboutin</h3>
                        <h6>DESIGNER</h6>
                        <Button justIcon link className={classes.margin5}>
                        <i className={"fab fa-instagram"} />
                        </Button>
                        <Button justIcon link className={classes.margin5}>
                        <i className={"fab fa-facebook"} />
                        </Button>
                        <Button justIcon link className={classes.margin5}>
                        <i className={"fab fa-youtube"} />
                        </Button>
                        <Button justIcon link className={classes.margin5}>
                        <i className={"fab fa-twitter"} />
                        </Button>
                    </div>
                    </div>
                </GridItem>
                </GridContainer>
                <div className={classes.description}>
                <p>
                    An artist of considerable range, Chet Faker — the name taken by
                    Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                    and records all of his own music, giving it a warm, intimate
                    feel with a solid groove structure.{" "}
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
        </div>
        <Footer />
        </div>
    );
}

Profile.propTypes = {
    props: PropTypes.object,
    history: PropTypes.object,
}

const mapStateToProps = (state) => ({
    
});

export default withRouter(connect(mapStateToProps)(Profile));