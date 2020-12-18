export const getVideoDataListFromPlayList = (data, hd) =>
  data
    ? data.items.map((item) => {
        return {
          title: item.snippet.title.replace(/&#39;/g, ","),
          channelTitle: item.snippet.channelTitle,
          publishedAt: item.snippet.publishedAt,
          channelId: item.snippet.channelId,
          description: item.snippet.description,
          thumbnail:
            hd && item.snippet.thumbnails.standard
              ? item.snippet.thumbnails.standard.url
              : item.snippet.thumbnails.high.url,
          videoId: item.contentDetails
            ? item.contentDetails.videoId
            : item.id.videoId,
        };
      })
    : [];
