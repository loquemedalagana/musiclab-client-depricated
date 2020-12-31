import React from "react";
import PropTypes from "prop-types";
import NotAvailableModal from "../common/NotAvailableModal";

const AddNewPost = (props) => {
  const { open, onClose } = props;
  return <NotAvailableModal open={open} onClose={onClose} />;
};

AddNewPost.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default AddNewPost;
