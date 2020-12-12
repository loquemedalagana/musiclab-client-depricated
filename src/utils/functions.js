import {
  twitterReg,
  facebookReg,
  instagramReg,
  blogReg,
  youtubeReg,
  soundcloudReg,
} from "../app/inputValidation/variablesAndRegs";

export const isDesktop = window.innerWidth > 959;

export const getUnreadElements = (elements) => {
  if (elements.length === 0) return [];
  return elements.filter((element) => element.isRead === false);
};

export const getUnreadElementsLength = (elements) => {
  if (elements.length === 0) return 0;
  return elements.filter((element) => element.isRead === false).length;
};

export const getDateKor = (dateformat) => {
  return `${dateformat.substring(0, 4)}년 ${dateformat.substring(
    5,
    7
  )}월 ${dateformat.substring(8, 10)}일`;
};

//check is valid sns link
export const checkSnsLink = (type, link) => {
  switch (type) {
    case "youtube":
      return youtubeReg.test(link);
    case "twitter":
      return twitterReg.test(link);
    case "instagram":
      return instagramReg.test(link);
    case "soundcloud":
      return soundcloudReg.test(link);
    case "facebook":
      return facebookReg.test(link);
    default:
      return blogReg.test(link);
  }
};

export const camelToSpace = (camelCase) =>
  camelCase.replace(
    /.[A-Z]/g,
    (match) => `${match[0]} ${match[1].toLowerCase()}`
  );
