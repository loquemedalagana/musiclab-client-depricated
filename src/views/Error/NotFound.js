import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Footer,
  GridContainer,
  GridItem,
  Card,
} from "../../components/components";

import { defaultBgStyle } from "../../assets/jss/material-kit-react/views/background";
import styles from "../../assets/jss/material-kit-react/views/ErrorPageStyle";

const useStyles = makeStyles(styles);

function NotFound() {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  setTimeout(() => {
    setCardAnimation("");
  }, 800);
  const classes = useStyles();

  return (
    <div className={clsx(classes.pageHeader, defaultBgStyle().root)}>
      <div className={classes.container}>
        <GridContainer
          justify={window.innerWidth > 959 ? "space-between" : "center"}
        >
          <GridItem xs={12} sm={12} md={6} lg={5}>
            <Card plain className={clsx(classes[cardAnimaton], classes.brand)}>
              <h1 className={classes.title}>404 Not Found</h1>
              <h2 className={classes.title}>존재하지 않는 페이지입니다.</h2>
              <h3 className={classes.subtitle}>Music Sseolprise by Inhyuk</h3>
              <h3 className={classes.subtitle}>
                원조 자작돌, 야다 전인혁의 뮤직 썰!프라이즈
              </h3>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
      <Footer whiteFont />
    </div>
  );
}

export default NotFound;
