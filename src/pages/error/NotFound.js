import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { GridItem, Card } from "../../components/components";

import NoParallaxLayout from "../../Layouts/NoParallaxLayout";
import styles from "../../assets/jss/material-kit-react/views/pages/noParallax/ErrorPageStyle";

const useStyles = makeStyles(styles);

const NotFound = (props) => {
  const { history } = props;
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  setTimeout(() => {
    setCardAnimation("");
    return setTimeout(() => history.push("/"), 3000);
  }, 800);
  const classes = useStyles();

  return (
    <NoParallaxLayout isBigCard={true}>
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
    </NoParallaxLayout>
  );
};

NotFound.propTypes = {
  history: PropTypes.object,
};

export default NotFound;
