import React, {useState} from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";

import {
    Face, Chat, Build
} from '@material-ui/icons'

import {
    Footer,
    GridContainer,
    GridItem,
    CustomTabs,
//    Button,
} from '../../components/components';

import {defaultBgStyle} from '../../assets/jss/material-kit-react/views/background';
import styles from '../../assets/jss/material-kit-react/views/UpdateProfileStyle';

const useStyles = makeStyles(styles);

const UpdateProfile = props => {
    const [cardAnimaton, setCardAnimation] = useState("cardHidden");
    setTimeout(() => {
        setCardAnimation("");
    }, 800);
    const classes = useStyles();
    //const [activeStep, setActiveStep] = useState(0);


    return (
        <div className={clsx(classes.pageHeader, defaultBgStyle().root)}>
                <div className={classes.container}>
                <GridContainer justify={window.innerWidth > 959 ? "space-between" : "center"}>
                    <GridItem xs={12} sm={12} md={7} lg={6} >
                            <CustomTabs
                                className={clsx(classes[cardAnimaton], classes.brand)}
                                headerColor="primary"
                                tabs={[
                                {
                                    tabName: "Profile",
                                    tabIcon: Face,
                                    tabContent: (
                                    <p className={classes.textCenter}>
                                        I think that’s a responsibility that I have, to push
                                        possibilities, to show people, this is the level that
                                        things could be at. So when you get something that has
                                        the name Kanye West on it, it’s supposed to be pushing
                                        the furthest possibilities. I will be the leader of a
                                        company that ends up being worth billions of dollars,
                                        because I got the answers. I understand culture. I am
                                        the nucleus.
                                    </p>
                                    )
                                },
                                {
                                    tabName: "Messages",
                                    tabIcon: Chat,
                                    tabContent: (
                                    <p className={classes.textCenter}>
                                        I think that’s a responsibility that I have, to push
                                        possibilities, to show people, this is the level that
                                        things could be at. I will be the leader of a company
                                        that ends up being worth billions of dollars, because I
                                        got the answers. I understand culture. I am the nucleus.
                                        I think that’s a responsibility that I have, to push
                                        possibilities, to show people, this is the level that
                                        things could be at.
                                    </p>
                                    )
                                },
                                {
                                    tabName: "Settings",
                                    tabIcon: Build,
                                    tabContent: (
                                    <p className={classes.textCenter}>
                                        think that’s a responsibility that I have, to push
                                        possibilities, to show people, this is the level that
                                        things could be at. So when you get something that has
                                        the name Kanye West on it, it’s supposed to be pushing
                                        the furthest possibilities. I will be the leader of a
                                        company that ends up being worth billions of dollars,
                                        because I got the answers. I understand culture. I am
                                        the nucleus.
                                    </p>
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

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile)
