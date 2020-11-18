import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import classNames from "classnames";
import { connect } from 'react-redux';

import { makeStyles } from "@material-ui/core/styles";

import {
    Footer,    
    Parallax,
    GridContainer,
    GridItem,
} from '../../components/components';

import VideoCarouselSection from './Sections/VideoCarouselSection';

import {mainParallaxStyle} from '../../assets/jss/material-kit-react/views/background';

import {appDescription, appShortTitle} from '../../utils/variablesAndRegs';
import styles from '../../assets/jss/material-kit-react/views/landingStyle';

const useStyles = makeStyles(styles);

export const Landing = (props) => {
    const classes = useStyles();
    //const { ...rest } = props;

    return (
        <>
        <Parallax className={mainParallaxStyle().root}>
            <div className={clsx(classes.container)}>
                <GridContainer type = "parallax">
                <GridItem xs={12} sm={12} md={6}>
                    <div className={classes.brand}>
                        <h1 className={classes.title}>{appShortTitle}</h1>
                        <h3 className={classes.subtitle}>
                            {appDescription}
                        </h3>
                    </div>
                </GridItem>
                </GridContainer>
            </div>
        </Parallax>

        <div className={classNames(classes.main, classes.mainRaised)}>
            <VideoCarouselSection 
                categoryTitle='Jeon Inhyuk Band Official Channel'
            />
            <VideoCarouselSection 
                categoryTitle='Music SSeolprise by Jeon Inhyuk'
            />
            <VideoCarouselSection 
                categoryTitle='Hot Videos of Inhyuk'
            />
            <VideoCarouselSection 
                categoryTitle='Latest Videos of Inhyuk'
            />

        </div>
        <Footer />
        </>
    )
}

Landing.propTypes = {
    props: PropTypes.object,
}

const mapStateToProps = (state) => ({
    
})


export default withRouter(connect(mapStateToProps)(Landing));