import { cardTitle, title, section } from "../../../material-kit-react";

export const videoSectionStyle = {
  ...section,
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
  },
  cardTitle,
  description: {
    color: "#999",
  },
  itemGrid: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  smallTitle: {
    color: "#6c757d",
  },
  justifyCenter: {
    justifyContent: "center !important",
  },
};
