import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';

import {
    InputAdornment, FormHelperText,
    FormControl, InputLabel, Select,
    MenuItem,
} from "@material-ui/core";
import People from "@material-ui/icons/People";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import MusicNoteIcon from '@material-ui/icons/MusicNote';


import {
    Footer,
    GridContainer,
    GridItem,
    Card,
    Button,
    CardBody,
    CustomInput,
    CardFooter,
    Header,
    HeaderLinks,
    DateTimePicker,
} from '../../components/components';
import {loginSignupUpdateStyle} from '../../assets/jss/material-kit-react/views/background';
import styles from '../../assets/jss/material-kit-react/views/LevelupStyle';
import {appTitle, levelupHelperText} from '../../utils/texts';
const useStyles = makeStyles(styles);

const alignment = {
    justifyContent: 'space-between',
}

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
                <GridContainer justify={window.innerWidth > 959 ? "space-between" : "center"}>
                    <GridItem xs={12} sm={12} md={6} lg={5} >
                    <Card className={classes[cardAnimaton]}>
                        <form className={classes.form}>

                        <p className={classes.divider}>실명과 생년월일은 운영진들한테만 공개됩니다.</p>
                        <CardBody className={alignment}>
                        <GridItem xs={12} sm={12} md={12}  >

                        <CustomInput
                            labelText="Your family name..."
                            id="last"
                            formControlProps={{
                                fullWidth: true,
                            }}
                            inputProps={{
                                type: "text",
                            }}
                        />

                        <CustomInput
                            labelText="Your given name..."
                            id="first"
                            formControlProps={{
                                fullWidth: true,
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
                        <br/> <br/>

                        <FormControl className={classes.formControl} required fullWidth>
                            <InputLabel id="select-gender">Gender(성별)</InputLabel>
                            <Select
                                labelId="select-gender"
                                id="simple-select"
                                value="male"
                                onChange={ null }
                            >
                                <MenuItem value="male">Male(남성)</MenuItem>
                                <MenuItem value="female">Female(여성)</MenuItem>
                            </Select>

                        </FormControl>
                        <br/> <br/>
                            <DateTimePicker 
                                title = "Your birthday"
                                inputProps = {{
                                    placeholder: 'Pick your birthday!'
                                }}
                            />

                            {/*글자 카운트 해주기*/}
                            <CustomInput
                            labelText="Your favorite song..."
                            id="description"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "text",
                                multiline: true,
                                endAdornment: (
                                <InputAdornment position="end">
                                    <MusicNoteIcon className={classes.inputIconsColor} />
                                </InputAdornment>
                                )
                            }}
                            />
                            <FormHelperText style = {{textAlign: 'right'}}>
                                {"자기소개는 최대 200자까지입니다."}
                            </FormHelperText>

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

                        </GridItem>

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
    props: PropTypes.object,
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Levelup);

/*
리덕스 추가되면 메인페이지로 이동

*/
