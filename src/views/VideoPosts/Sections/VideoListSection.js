import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";

import {
  GridContainer,
  GridItem,
  CircularLoading,
  PostPreview,
} from '../../../components/components';

import { 
  getPlayListURL,
  getVideoDataFromPlayList,
} from '../../../app/videoData/videoFetchEndpoints';

import styles from "../../../assets/jss/material-kit-react/views/videoListStyle";

import { 
  officialChannelProfileData, 
} from '../../../app/videoData/officialChannelData';

const useStyles = makeStyles(styles);

const NotAvailable = ({className}) => (
  <GridItem xs={12} sm={12} md={11}>
    <h3 className={className}>준비중입니다...</h3>
  </GridItem>
)

export const VideoListSection = props => {
  const {
    videoListId,
    type,
  } = props;

  const classes = useStyles();
  const [resultData, setResultData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const ENDPOINT = type === 'channel' || 'official' ? getPlayListURL(videoListId, 4) : null;

  console.log(videoListId);
  const [channelInfo] = officialChannelProfileData.filter(({playListId}) => playListId === videoListId);

  useEffect(() => {
    fetch(ENDPOINT, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(data => {
      const result = getVideoDataFromPlayList(data, true);            
        setLoading(false);
        setResultData(result);
    })
    .catch(err => {
      setLoading(false);
      setError(err);
    });
  }, [ENDPOINT, type, videoListId]);


  //이 부분 손 들어감
  console.log(resultData);

  const {
    channelTitle,
    image
  } = channelInfo;

  if(!resultData && ENDPOINT && loading) return (
    <div className={classes.section}>
      <div className={classes.container}>
        <CircularLoading />
      </div>
    </div>
  );

  if(!ENDPOINT || error || !channelInfo)  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer justify='center'>
          <NotAvailable className={classes.detail}/>                    
        </GridContainer>
      </div>
    </div>
  );


  return (
    <GridContainer className={classes.listContainer} spacing = {4}>
      {resultData.map((data, idx) => (
        <GridItem xs={12} sm={12} md={6} key={idx}>
          <PostPreview             
            type = 'youtube'
            authorData = {{
              channelTitle,
              image
            }}
            postData = {data}
          />
        </GridItem>

      ))}
    </GridContainer>
  )
}

VideoListSection.propTypes = {
  props: PropTypes.object,
  type: PropTypes.oneOf([
    "official",
    "channel",
    "keywords"
  ]),
  children: PropTypes.node
}

const mapStateToProps = (state) => ({
  
})

export default connect(mapStateToProps)(VideoListSection)
