export default (theme) => ({
  wrapper: {
    transform: "translateZ(0px)",
    flexGrow: 1,
    display: "flex",
    border: "0",
    borderRadius: "3px",
    padding: "0.9375rem 0",
    marginTop: "90vh",
    marginBottom: "20px",
    width: "100%",
    transition: "all 150ms ease 0s",
    alignItems: "center",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    position: "relative",
  },
  fixed: {
    position: "fixed",
    zIndex: "1099",
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(3),
    right: theme.spacing(5),
  },
});
