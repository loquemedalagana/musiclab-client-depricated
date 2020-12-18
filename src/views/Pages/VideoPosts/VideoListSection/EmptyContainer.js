import React from "react";
import PropTypes from "prop-types";

import { GridContainer } from "../../../../components/components";

const EmptyContainer = (props) => {
  const { children, className } = props;
  return (
    <GridContainer justify="center" className={className}>
      {children}
    </GridContainer>
  );
};

EmptyContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default EmptyContainer;
