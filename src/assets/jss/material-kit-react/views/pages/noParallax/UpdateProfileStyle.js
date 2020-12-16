import { container } from "../../../../material-kit-react";
import customInputStyle from "../../../components/customInputStyle";
import customCheckboxRadioSwitch from "../../../components/customCheckboxRadioSwitch.js";
import imagesStyle from "../../../components/ImgStyle";

export default {
  profileInput: {
    justifyContent: "space-between !important",
  },
  passwordInputs: {
    justifyContent: "space-between !important",
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)",
  },
  brand: {
    color: "rgba(26, 26, 46, )",
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
  ...imagesStyle,
  cardHeader: {
    width: "auto",
    textAlign: "center",
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "-40px",
    padding: "20px 0",
    marginBottom: "15px",
  },
  tabBody: {
    ...container,
    position: "relative",
    paddingTop: "5vh",
    paddingBottom: "20px",
  },
  divider: {
    marginTop: "30px",
    marginBottom: "0px",
    textAlign: "center",
  },
  form: {
    margin: "0",
  },
  cardFooter: {
    //paddingTop: "0rem",
    border: "0",
    borderRadius: "6px",
    justifyContent: "space-between !important",
  },
  section: {
    background: "#EEEEEE",
    padding: "70px 0",
  },
  textCenter: {
    textAlign: "center",
  },
  ...customCheckboxRadioSwitch,
  ...customInputStyle,
};
