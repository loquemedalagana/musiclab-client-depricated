const YoutubeApiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
export const JeonInhyukBandOfficialChannel = 'UChNtl7wRLF6x4B4fp7KCyhQ';
export const JeonInhyukBandPlayListId = 'UUhNtl7wRLF6x4B4fp7KCyhQ';

const comma = '%2';

export const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';
export const YOUTUBE_CHANNEL_ITEMS_API = 'https://www.googleapis.com/youtube/v3/channels';
export const YOUTUBE_VIDEO_ITEMS_API = 'https://www.googleapis.com/youtube/v3/videos';

export const JeonInhyukBandChannelEndPoint = `${YOUTUBE_CHANNEL_ITEMS_API}?part=snippet${comma}CcontentDetails&id=${JeonInhyukBandOfficialChannel}&key=${YoutubeApiKey}`;
export const JeonInhyukBandPlayListEndPoint = `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet${comma}CcontentDetails&playlistId=${JeonInhyukBandPlayListId}&key=${YoutubeApiKey}`;

//function for search result
export const getPlayListURL = (playlistId, maxResults) => `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet${comma}CcontentDetails&playlistId=${playlistId}&maxResults=${maxResults}&key=${YoutubeApiKey}`;

//youtube video params https://developers.google.com/youtube/v3/docs/videos?hl=ko
//youtube video channel https://developers.google.com/youtube/v3/docs/channels/list?hl=ko
//youtube video playlist https://developers.google.com/youtube/v3/docs/playlistItems/list#request

//guide https://www.freecodecamp.org/news/how-to-add-a-youtube-playlist-to-a-nextjs-react-app-with-the-youtube-api/
//guide search result https://moonsupport.tistory.com/130