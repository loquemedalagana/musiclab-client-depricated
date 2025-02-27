import customCheckboxRadioSwitch from "./customCheckboxRadioSwitch";
import customInputStyle from "./customInputStyle";
const headerBackgroundColor = [
  "#f9f7cf",
  "#d0e8f2",
  "#ffdada",
  "#e3dfc8",
  "#fbe2e5",
  "#ffe0f7",
];

const modalStyle = {
  modal: {
    borderRadius: "6px",
  },
  modalHeader: {
    borderBottom: "none",
    paddingTop: "24px",
    paddingRight: "24px",
    paddingBottom: "20px",
    paddingLeft: "24px",
    minHeight: "16.43px",
    backgroundColor: Math.floor(Math.random() * headerBackgroundColor.length),
  },
  modalTitle: {
    margin: "0",
    lineHeight: "1.42857143",
  },
  modalCloseButton: {
    color: "#999999",
    marginTop: "-12px",
    WebkitAppearance: "none",
    padding: "0",
    cursor: "pointer",
    background: "0 0",
    border: "0",
    fontSize: "inherit",
    opacity: ".9",
    textShadow: "none",
    fontWeight: "700",
    lineHeight: "1",
    float: "right",
  },
  modalClose: {
    width: "16px",
    height: "16px",
  },
  modalBody: {
    paddingTop: "24px",
    paddingRight: "24px",
    paddingBottom: "16px",
    paddingLeft: "24px",
    position: "relative",
  },
  modalDescription: {
    color: "#999",
    textAlign: "center",
  },
  radioGroup: {
    marginRight: "15px",
    marginLeft: "15px",
  },
  textArea: {
    marginRight: "15px",
    marginLeft: "15px",
  },
  textCenter: {
    textAlign: "center",
  },
  inputIconsColor: {
    color: "#495057",
  },
  modalFooter: {
    padding: "15px",
    textAlign: "right",
    paddingTop: "0",
    margin: "0",
  },
  modalFooterCenter: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  miniButtonIcon: {
    width: "17px",
    height: "17px",
    color: "#FFFFFF",
  },
  ...customCheckboxRadioSwitch,
  ...customInputStyle,
};

export default modalStyle;
