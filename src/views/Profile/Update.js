import React, {useState} from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";
import {
    Footer,
    GridContainer,
    GridItem,
} from '../../components/components';

import {defaultBgStyle} from '../../assets/jss/material-kit-react/views/background';
import styles from '../../assets/jss/material-kit-react/views/NotfoundStyle';

const useStyles = makeStyles(styles);

export const Update = () => {
    const [cardAnimaton, setCardAnimation] = useState("cardHidden");
    setTimeout(() => {
        setCardAnimation("");
    }, 800);
    const classes = useStyles();

    return (
        <div className={clsx(classes.pageHeader, defaultBgStyle().root)}>
                <div className={classes.container}>
                <GridContainer justify={window.innerWidth > 959 ? "space-between" : "center"}>
                    <GridItem xs={12} sm={12} md={6} lg={5} >
                        <div className={clsx(classes[cardAnimaton], classes.brand)}>
                            
                            <h3 className={classes.subtitle}>
                                Music Sseolprise by Inhyuk
                            </h3>
                            <h3 className={classes.subtitle}>
                                원조 자작돌, 야다 전인혁의 뮤직 썰!프라이즈
                            </h3>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Update)
