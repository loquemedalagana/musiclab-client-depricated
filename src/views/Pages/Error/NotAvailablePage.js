import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { GridItem, Card } from "../../../components/components";

import NoParallaxLayout from "../../Layouts/NoParallaxLayout";
import styles from "../../../assets/jss/material-kit-react/views/pages/noParallax/ErrorPageStyle";

const useStyles = makeStyles(styles);

const NotAvailablePage = () => {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  setTimeout(() => {
    setCardAnimation("");
  }, 800);
  const classes = useStyles();

  return (
    <NoParallaxLayout isBigCard={true}>
      <GridItem xs={12} sm={12} md={6} lg={5}>
        <Card plain className={clsx(classes[cardAnimaton], classes.brand)}>
          <h1 className={classes.title}>현재 준비중인 페이지입니다.</h1>
          <h3 className={classes.subtitle}>Music Sseolprise by Inhyuk</h3>
          <h3 className={classes.subtitle}>
            원조 자작돌, 야다 전인혁의 뮤직 썰!프라이즈
          </h3>
        </Card>
      </GridItem>
    </NoParallaxLayout>
  );
};

NotAvailablePage.propTypes = {
  history: PropTypes.object,
};

export default NotAvailablePage;
