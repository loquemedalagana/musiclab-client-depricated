export default {
  imgFluid: {
    //profile - avatar
    width: "160px",
    height: "160px",
    objectFit: "cover",
    overflow: "hidden",
  },
  imgCursor: {
    cursor: "pointer",
  },
  imgRounded: {
    //profile - navpills
    borderRadius: "6px !important",
    "&:hover": {
      opacity: "0.5",
    },
  },
  imgRoundedCircle: {
    //profile - avatar
    borderRadius: "50% !important",
  },
  imgBackground: {
    backgroundColor: "white",
  },
  imgRoundedCircleHover: {
    "&:hover": {
      opacity: "0.6",
    },
  },
  imgRaised: {
    //profile - avatar
    boxShadow:
      "0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  },
  imgGallery: {
    //profile - navpills
    width: "100%",
    marginBottom: "2.142rem",
  },
  imgCardTop: {
    width: "100%",
    borderTopLeftRadius: "calc(.25rem - 1px)",
    borderTopRightRadius: "calc(.25rem - 1px)",
  },
  imgCardBottom: {
    width: "100%",
    borderBottomLeftRadius: "calc(.25rem - 1px)",
    borderBottomRightRadius: "calc(.25rem - 1px)",
  },
  imgCard: {
    width: "100%",
    borderRadius: "calc(.25rem - 1px)",
  },
  imgCardOverlay: {
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    padding: "1.25rem",
  },
};
