import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";
import {
    Footer,
    Card,
    GridContainer,
    GridItem,

} from '../../components/components';

import {loginSignupUpdateStyle} from '../../assets/jss/material-kit-react/views/background';
import styles from '../../assets/jss/material-kit-react/views/LevelupStyle';

const useStyles = makeStyles(styles);

function NotFound() {
    const [cardAnimaton, setCardAnimation] = useState("cardHidden");
    setTimeout(() => {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();

    return (
        <div className={clsx(classes.pageHeader, loginSignupUpdateStyle().root)}>
            <div className={classes.container}>
                <GridContainer justify={window.innerWidth > 959 ? "space-between" : "center"}>
                    <GridItem xs={12} sm={12} md={6} lg={5} >
                        <Card className={classes[cardAnimaton]}>
                            <h1>404 not found</h1>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
            <Footer whiteFont />
        </div>
    )
}

export default NotFound
