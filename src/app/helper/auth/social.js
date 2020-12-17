import {
  blogReg,
  facebookReg,
  instagramReg,
  soundcloudReg,
  twitterReg,
  youtubeReg,
} from "./regex";

export const SOCIAL_LIST = [
  "youtube",
  "twitter",
  "instagram",
  "soundcloud",
  "facebook",
  "blog",
];

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
