export default {
  scrollbarLadyLips: {
    scrollbarColor: "#ff9a9e #f5f5f5",
    "&::-webkit-scrollbar-track": {
      WebkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#F5F5F5",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar": {
      width: "12px",
      backgroundColor: "#F5F5F5",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      WebkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.1)",
      backgroundImage: [
        "-webkit-gradient(linear, left bottom, left top, from(#ff9a9e), color-stop(99%, #fecfef),\nto(#fecfef))",
        "-webkit-linear-gradient(bottom, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
        "linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
      ],
    },
  },
};
