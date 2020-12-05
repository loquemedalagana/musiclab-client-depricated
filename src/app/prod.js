//server url
export const SERVERURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_SERVERURL
    : process.env.REACT_APP_SERVERURL;
