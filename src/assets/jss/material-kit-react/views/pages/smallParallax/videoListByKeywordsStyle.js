import { container, title } from "../../../../material-kit-react";
import imagesStyle from "../../../components/ImgStyle";

export default {
  container,
  ...imagesStyle,
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
  },
  navWrapper: {
    margin: "20px auto 50px auto",
    textAlign: "center",
  },
  emptyContainer: {
    minHeight: "50vh",
    alignContent: "center",
  },
};
