import React, {useState} from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";

import { 
    Stepper,
} from "@material-ui/core";

import {
    Footer,
    GridContainer,
    GridItem,
    Card,
    CardNavigation,
    CardHeader,
    CardFooter,
    CardBody,
    Button,
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
    const [activeStep, setActiveStep] = useState(0);


    return (
        <div className={clsx(classes.pageHeader, defaultBgStyle().root)}>
                <div className={classes.container}>
                <GridContainer justify={window.innerWidth > 959 ? "space-between" : "center"}>
                    <GridItem xs={12} sm={12} md={6} lg={5} >
                        <Card className={clsx(classes[cardAnimaton], classes.brand)}>
                            <CardHeader>
                                <h1 className={classes.title}>
                                    Edit profile
                                </h1>
                            </CardHeader>
                            <CardNavigation>
                                Navi
                            </CardNavigation>
                            <CardBody>

                            </CardBody>
                            <CardFooter className={classes.cardFooter}>
                                <Button simple 
                                    disabled
                                    color="primary" 
                                    size="lg" 
                                    onClick={null}
                                >
                                Back
                                </Button>
                                <Button simple 
                                    color="primary" 
                                    size="lg" 
                                    onClick={null}
                                >
                                Next
                                </Button>
                            </CardFooter>

                        </Card>
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
