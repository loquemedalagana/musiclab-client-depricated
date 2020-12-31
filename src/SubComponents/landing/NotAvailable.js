import PropTypes from "prop-types";
import React from "react";
import { GridItem } from "../../components/components";

const NotAvailable = ({ className }) => (
  <GridItem xs={12} sm={12} md={11}>
    <h3 className={className}>준비중입니다...</h3>
  </GridItem>
);

NotAvailable.propTypes = {
  className: PropTypes.string,
};

export default NotAvailable;
