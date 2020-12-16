import customInputStyle from "../../../components/customInputStyle";
import customCheckboxRadioSwitch from "../../../components/customCheckboxRadioSwitch.js";

export default {
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
    fontFamily: "Poor Story",
    fontSize: "1.89rem",
    fontWeight: "600",
    maxWidth: "500px",
    margin: "10px 0 0",
  },
  content: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px 0 0",
  },
  ...customCheckboxRadioSwitch,
  ...customInputStyle,
};
