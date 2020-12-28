import { container, title } from "../../../../material-kit-react";

import imagesStyle from "../../../components/ImgStyle";
import scrollbarStyle from "../../../components/scrollbarStyle";

const smallParallaxPageStyle = {
  container,
  profile: {
    textAlign: "center",
    "& img": {
      maxWidth: "160px",
      width: "100%",
      margin: "0 auto",
      transform: "translate3d(0, -50%, 0)",
    },
  },
  description: {
    margin: "1.071rem auto 0",
    maxWidth: "600px",
    color: "#999",
    textAlign: "center !important",
  },
  name: {
    // 글쓴이 이름(post에서)
    marginTop: "-80px",
  },
  channelTitle: {
    marginTop: "-80px",
  },
  ...imagesStyle,
  ...scrollbarStyle,
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

export default smallParallaxPageStyle;
