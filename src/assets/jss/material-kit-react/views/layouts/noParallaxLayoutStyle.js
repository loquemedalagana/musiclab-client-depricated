import { container } from "../../../material-kit-react";

export default {
  container: {
    ...container,
    zIndex: "2",
    position: "relative",
    paddingTop: "20vh",
    color:
      "linear-gradient(to bottom, rgba(255, 255, 255) 45%, rgba(255, 255, 255, .5)), linear-gradient(to right,  rgba(255, 163, 208, .3), transparent), linear-gradient(to left, rgba(0, 255, 255, .3) 45%, transparent)",
    paddingBottom: "200px",
  },
  pageHeader: {
    minHeight: "100vh",
    height: "auto",
    display: "inherit",
    position: "relative",
    margin: "0",
    padding: "0",
    border: "0",
    alignItems: "center",

    "&:before": {
      background:
        "linear-gradient(60deg, rgba(215, 137, 215, 0.2),rgba(163, 216, 244, 0.3))",
    },
    "&:before,&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: '""',
    },
    "& footer li a,& footer li a:hover,& footer li a:active": {
      color: "#FFFFFF",
    },
    "& footer": {
      position: "absolute",
      bottom: "0",
      width: "100%",
    },
  },
};
