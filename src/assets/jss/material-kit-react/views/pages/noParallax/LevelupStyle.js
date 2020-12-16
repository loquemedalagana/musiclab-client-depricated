import { container } from "../../../../material-kit-react";
import customInputStyle from "../../../components/customInputStyle";
import customCheckboxRadioSwitch from "../../../components/customCheckboxRadioSwitch.js";

export default {
  container: {
    ...container,
    zIndex: "2",
    position: "relative",
    paddingTop: "10vh",
    color:
      "linear-gradient(to bottom, rgba(255, 255, 255) 45%, rgba(255, 255, 255, .5)), linear-gradient(to right,  rgba(255, 163, 208, .3), transparent), linear-gradient(to left, rgba(0, 255, 255, .3) 45%, transparent)",
    paddingBottom: "200px",
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)",
  },
  pageHeader: {
    minHeight: "100vh",
    height: "auto",
    display: "inherit",
    position: "relative",
    flexDirection: "row",
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
  form: {
    margin: "0",
  },
  cardHeader: {
    width: "auto",
    textAlign: "center",
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "-40px",
    padding: "20px 0",
    marginBottom: "15px",
  },
  divider: {
    marginTop: "30px",
    marginBottom: "0px",
    textAlign: "center",
  },
  cardFooter: {
    paddingTop: "0rem",
    border: "0",
    borderRadius: "6px",
    justifyContent: "center !important",
  },
  inputIconsColor: {
    color: "#495057",
  },
  brand: {
    color: "#1a1a2e",
    textAlign: "left",
  },
  title: {
    fontSize: "4.2rem",
    fontWeight: "600",
    display: "inline-block",
    position: "relative",
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px 0 0",
  },
  ...customCheckboxRadioSwitch,
  ...customInputStyle,
};
