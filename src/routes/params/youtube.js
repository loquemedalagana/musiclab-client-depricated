export const YOUTUBE_ROUTE = "/youtube";
export const YOUTUBE_VIDEO_SEARCH_ROUTE = YOUTUBE_ROUTE;
export const YOUTUBE_CHANNEL_PROFILE_ROUTE = YOUTUBE_ROUTE + "/channels";

export const JIHBAND_YOUTUBE_PROFILE_ROUTE =
  YOUTUBE_CHANNEL_PROFILE_ROUTE + "/jihbandofficial?category=official";

export const YOUTUBE_VIDEO_LIST = YOUTUBE_ROUTE + "/list";
export const MY_YOUTUBE_VIDEO_LIST = YOUTUBE_VIDEO_LIST + "/my";

export const YOUTUBE_VIDEO_ROUTE = YOUTUBE_ROUTE + "/videos"; // + id가 들어감
export const GET_YOUTUBE_VIDEO_ROUTE = (videoId) =>
  YOUTUBE_VIDEO_ROUTE + `/${videoId}`;

// example
// youtube/search?title=진혼
