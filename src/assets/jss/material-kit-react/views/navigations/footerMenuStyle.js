export default (theme) => ({
  wrapper: {
    transform: "translateZ(0px)",
    flexGrow: 1,
    display: "flex",
    border: "0",
    borderRadius: "3px",
    padding: "0.625rem 0",
    marginBottom: "20px",
    width: "100%",
    transition: "all 150ms ease 0s",
    alignItems: "center",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    position: "relative",
    zIndex: "unset",
  },
  absolute: {
    position: "absolute",
    zIndex: "1200",
  },
  fixed: {
    position: "fixed",
    zIndex: "1200",
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
});
