import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import NoParallaxLayout from "../../../Layouts/NoParallaxLayout";

import styles from "../../../assets/jss/material-kit-react/views/pages/noParallax/AuthGeneralStyle";
import { Card, CardBody, GridItem } from "../../../components/components";

const useStyles = makeStyles(styles);

const Agreement = (props) => {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  setTimeout(() => {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();

  return (
    <NoParallaxLayout isBigCard={true}>
      <GridItem xs={12} sm={12} md={6} lg={5}>
        <Card className={classes[cardAnimaton]}>
          <CardBody className={classes.bigCardBody}>
            <p>(주)뮤직랩 서비스 이용약관</p>
          </CardBody>
        </Card>
      </GridItem>
    </NoParallaxLayout>
  );
};

Agreement.propTypes = {};

export default Agreement;
