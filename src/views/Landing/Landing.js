import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import classNames from "classnames";
import { connect } from 'react-redux';

import { makeStyles } from "@material-ui/core/styles";

import {
    Header,
    HeaderLinks,
    Footer,
    
    Parallax,

    GridContainer,
    GridItem,
} from '../../components/components';

import {mainParallaxStyle} from '../../assets/jss/material-kit-react/views/background';

import {appTitle, appDescription} from '../../utils/texts';
import styles from '../../assets/jss/material-kit-react/views/landingStyle';

const dashboardRoutes = [];
const useStyles = makeStyles(styles);

const testText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet volutpat consequat mauris nunc congue nisi. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Porta lorem mollis aliquam ut porttitor. Sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Porttitor lacus luctus accumsan tortor posuere. Metus vulputate eu scelerisque felis imperdiet proin fermentum. Nisl suscipit adipiscing bibendum est ultricies integer. Sed egestas egestas fringilla phasellus faucibus scelerisque. Bibendum at varius vel pharetra vel turpis nunc. Nisl rhoncus mattis rhoncus urna neque viverra justo. Viverra nam libero justo laoreet sit amet cursus. Viverra ipsum nunc aliquet bibendum enim facilisis. Pharetra et ultrices neque ornare aenean euismod elementum. Luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor. Morbi quis commodo odio aenean sed adipiscing. Pretium aenean pharetra magna ac placerat vestibulum.\nScelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam. Pellentesque diam volutpat commodo sed egestas egestas fringilla. Lacus luctus accumsan tortor posuere ac. Nulla aliquet porttitor lacus luctus accumsan tortor. Nunc vel risus commodo viverra maecenas. Enim ut tellus elementum sagittis vitae et leo. Amet massa vitae tortor condimentum lacinia quis. Dui vivamus arcu felis bibendum ut. Tempus imperdiet nulla malesuada pellentesque elit eget gravida. Et magnis dis parturient montes nascetur ridiculus. Integer enim neque volutpat ac tincidunt vitae semper quis. Cursus eget nunc scelerisque viverra mauris in. Magna fringilla urna porttitor rhoncus dolor purus non. In eu mi bibendum neque egestas congue quisque egestas diam. Vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt. Venenatis urna cursus eget nunc scelerisque viverra mauris in. Bibendum est ultricies integer quis auctor.\nMagna sit amet purus gravida. Suspendisse interdum consectetur libero id. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Neque egestas congue quisque egestas diam in arcu. Malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Etiam erat velit scelerisque in dictum non consectetur a erat. Integer enim neque volutpat ac tincidunt vitae semper quis lectus. Ut sem viverra aliquet eget sit amet tellus. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus. Mauris pellentesque pulvinar pellentesque habitant. Sed risus pretium quam vulputate dignissim suspendisse in est. Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Non nisi est sit amet facilisis magna. Et netus et malesuada fames ac. Pellentesque pulvinar pellentesque habitant morbi tristique. Malesuada proin libero nunc consequat interdum varius sit. Amet nisl purus in mollis nunc sed id semper risus.\nAenean vel elit scelerisque mauris pellentesque pulvinar. Erat imperdiet sed euismod nisi. Adipiscing commodo elit at imperdiet. Dignissim sodales ut eu sem integer vitae justo eget. Venenatis a condimentum vitae sapien pellentesque habitant. Urna condimentum mattis pellentesque id nibh tortor id. Arcu cursus vitae congue mauris. Sit amet risus nullam eget felis eget. Proin libero nunc consequat interdum varius sit amet mattis vulputate. Nunc sed id semper risus in hendrerit gravida. Ligula ullamcorper malesuada proin libero nunc consequat. Est sit amet facilisis magna etiam tempor. Nunc sed id semper risus in hendrerit gravida rutrum. Tortor at risus viverra adipiscing. Faucibus scelerisque eleifend donec pretium vulputate sapien nec. Ultrices tincidunt arcu non sodales neque sodales.";

export const Landing = (props) => {
    const classes = useStyles();
    const { ...rest } = props;
    

    return (
        <>
        <Header
            color="transparent"
            routes={dashboardRoutes}
            brand={appTitle}
            rightLinks={<HeaderLinks />}
            fixed
            changeColorOnScroll={{
            height: 400,
            color: "info"
            }}
            {...rest}
        />
        <Parallax className={mainParallaxStyle().root}>
            <div className={clsx(classes.container)}>
                <GridContainer type = "parallax">
                <GridItem xs={12} sm={12} md={6}>
                    <div className={classes.brand}>
                        <h1 className={classes.title}>{appTitle}</h1>
                        <h3 className={classes.subtitle}>
                            {appDescription}
                        </h3>
                    </div>
                </GridItem>
                </GridContainer>
            </div>
        </Parallax>

        <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container}>
                {testText}
            </div>
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

const mapDispatchToProps = {
    
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Landing));