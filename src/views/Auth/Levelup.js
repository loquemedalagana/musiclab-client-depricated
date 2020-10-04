import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';

import {InputAdornment} from "@material-ui/core";
import People from "@material-ui/icons/People";
import VpnKeyIcon from '@material-ui/icons/VpnKey';


import {
    Footer,
    GridContainer,
    GridItem,
    Card,
    CardHeader,
    Button,
    CardBody,
    CustomInput,
    CardFooter,
    Header,
    HeaderLinks,
} from '../../components/components';
import {loginSignupUpdateStyle} from '../../assets/jss/material-kit-react/views/background';
import styles from '../../assets/jss/material-kit-react/views/LoginSignupStyle';
import {appTitle, levelupHelperText} from '../../app/texts';
const useStyles = makeStyles(styles);

export const Levelup = (props) => {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(() => {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;

    return (
        <>
            <Header
                absolute
                color="transparent"
                brand={appTitle}
                rightLinks={<HeaderLinks />}
                {...rest}
            />
        <div className={clsx(classes.pageHeader, loginSignupUpdateStyle().root)}>
            <div className={classes.container}>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6} lg={5} >
                <Card className={classes[cardAnimaton]}>
                    <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                        <h4>Sign up with</h4>
                        <div className={classes.socialLine}>
                            <p>{levelupHelperText}</p>
                        </div>
                    </CardHeader>
                    <p className={classes.divider}>실명과 생년월일은 운영진들한테만 공개됩니다.</p>
                    <CardBody>
                        <CustomInput
                        labelText="Your nickname..."
                        id="first"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            type: "text",
                            endAdornment: (
                            <InputAdornment position="end">
                                <People className={classes.inputIconsColor} />
                            </InputAdornment>
                            )
                        }}
                        />


                        <CustomInput
                        labelText="Password"
                        id="pass"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            type: "password",
                            endAdornment: (
                            <InputAdornment position="end">
                                <VpnKeyIcon className={classes.inputIconsColor} />
                            </InputAdornment>
                            ),
                            autoComplete: "off"
                        }}
                        />
                    <CustomInput
                        labelText="Confirm Password"
                        id="confirmpass"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            type: "password",
                            endAdornment: (
                            <InputAdornment position="end">
                                <VpnKeyIcon className={classes.inputIconsColor} />
                            </InputAdornment>
                            ),
                            autoComplete: "off"
                        }}
                        />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                        <Button simple color="primary" size="lg">
                        Submit
                        </Button>
                    </CardFooter>
                    </form>
                </Card>
                </GridItem>
            </GridContainer>
            </div>
            <Footer whiteFont />
        </div>
        </>
    )
}

Levelup.propTypes = {
    props: PropTypes
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Levelup);

/*
리덕스 추가되면 메인페이지로 이동

*/
