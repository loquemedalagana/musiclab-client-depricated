import {
  getHotVideoListURL,
  getLatestVideoListURL,
  getPlayListURL,
  JeonInhyukBandPlayListId,
} from "./youtube/youtubeFetchEndpoints";

export const JIHBAND_OFFICIAL_LIST = getPlayListURL(
  JeonInhyukBandPlayListId,
  6
);
export const HOT_VIDEO_LIST = getHotVideoListURL([], 10);
export const LATEST_VIDEO_LIST = getLatestVideoListURL([], 10);
