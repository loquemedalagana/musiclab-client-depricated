const YoutubeApiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
export const JeonInhyukBandOfficialChannel = 'UChNtl7wRLF6x4B4fp7KCyhQ';
export const JeonInhyukBandPlayListId = 'UUhNtl7wRLF6x4B4fp7KCyhQ';

const comma = '%2';

export const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';
export const YOUTUBE_CHANNEL_ITEMS_API = 'https://www.googleapis.com/youtube/v3/channels';
export const YOUTUBE_VIDEO_ITEMS_API = 'https://www.googleapis.com/youtube/v3/videos';
export const YOUTUBE_VIDEO_SEARCH_API = 'https://www.googleapis.com/youtube/v3/search';

export const JeonInhyukBandChannelEndPoint = `${YOUTUBE_CHANNEL_ITEMS_API}?part=snippet${comma}CcontentDetails&id=${JeonInhyukBandOfficialChannel}&key=${YoutubeApiKey}`;
export const JeonInhyukBandPlayListEndPoint = `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet${comma}CcontentDetails&playlistId=${JeonInhyukBandPlayListId}&key=${YoutubeApiKey}`;

export const getPlayListURL = (playlistId, maxResults) => `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet${comma}CcontentDetails&playlistId=${playlistId}&maxResults=${maxResults}&key=${YoutubeApiKey}`;

//search result based on keyword array
export const getLatestVideoListURL = (searchKeywords, maxResults) => {
  const defaultDate = '2018-01-01T00:00:00Z';
  if(searchKeywords.length === 0){
    return `${YOUTUBE_VIDEO_SEARCH_API}?part=snippet&q=야다+전인혁&order=relevance&publishedAfter=${defaultDate}&maxResults=${maxResults}&key=${YoutubeApiKey}`
  }
  else {
    return null;
  }
}

export const getHotVideoListURL = (searchKeywords, maxResults) => {
  if(searchKeywords.length === 0){
    return `${YOUTUBE_VIDEO_SEARCH_API}?part=snippet&q=야다+전인혁&order=viewCount&maxResults=${maxResults}&key=${YoutubeApiKey}`
  }
  else {
    return null;
  }
}

export const getVideoDataFromPlayList = data => data ? data.items.map(item => {        
  return ({
    title: item.snippet.title.replace(/&#39;/g, ','),
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
    channelId: item.snippet.channelId,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.high.url,
    videoId: item.contentDetails ? item.contentDetails.videoId : item.id.videoId,
  })
}) : [];