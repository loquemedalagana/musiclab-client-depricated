export const youtubeReg = /^https?:\/\/(www\.)?youtube\.com\/(c|user|channel)\/[A-Za-z0-9_-]{1,}$/;
export const twitterReg = /^https:\/\/twitter\.com\/[a-zA-Z0-9_]{1,15}$/;
export const blogReg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/=]*)$/;
export const instagramReg = /^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9-_.]{1,255}\/?$/;
export const facebookReg = /^https?:\/\/(www\.)?(facebook|fb)\.com\/(([A-Za-z0-9.]{5,50})|(profile\.php\?id=\d+))$/;
export const soundcloudReg = /^https?:\/\/(www\.)?soundcloud\.com\/[A-Za-z0-9_-]{1,}$/;

export const SOCIAL_NAME_LIST = [
  "youtube",
  "twitter",
  "instagram",
  "soundcloud",
  "facebook",
  "blog",
];
