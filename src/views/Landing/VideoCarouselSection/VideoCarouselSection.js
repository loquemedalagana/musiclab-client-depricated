import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";

import PrintVideoCarousel from './PrintVideoCarousel';

import {
  GridContainer,
  GridItem,
  CircularLoading,
} from '../../../components/components';

import {
  SampleVideoList
} from '../../../app/videoData/SampleData/SampleData';

import styles from '../../../assets/jss/material-kit-react/components/carouselStyle';
import { 
	getVideoDataFromPlayList,
  JeonInhyukBandPlayListId,
  getPlayListURL, 
  getLatestVideoListURL,
  getHotVideoListURL,
} from '../../../app/videoData/videoFetchEndpoints';

const useStyles = makeStyles(styles);

//print title
const printTitle = (categoryTitle, style) => (
  <GridItem xs={12} sm={12} md={11}>
    <h2 className={style}>{categoryTitle}</h2>
  </GridItem>
)

const NotAvailable = ({className}) => (
  <GridItem xs={12} sm={12} md={11}>
    <h3 className={className}>준비중입니다...</h3>
  </GridItem>
)

const getPlayListEndpoint = categoryTitle => {
  switch(categoryTitle){
    case 'Jeon Inhyuk Band Official Channel':
      return getPlayListURL(JeonInhyukBandPlayListId, 6);
    case 'Music SSeolprise by Jeon Inhyuk':
      return null;
    case 'Hot Videos of Inhyuk':
      return getHotVideoListURL([], 10);
    case 'Latest Videos of Inhyuk':
      return getLatestVideoListURL([], 10);
    case 'My List':
      return 'Not Available'; //will be changed based on redux 
    default: 
      return null;
  }
}

//return channel detail link
const getChannelRoute = categoryTitle => {
  switch(categoryTitle){
    case 'Jeon Inhyuk Band Official Channel':
      return '/officialvideolist/jihbandofficial';
    case 'Music SSeolprise by Jeon Inhyuk':
			return null; //will be added
			
    case 'Hot Videos of Inhyuk':
    case 'Latest Videos of Inhyuk':
      return '/videolistbykeywords';
    default: //return search result
			return null;
  }
}



export const VideoCarouselSection = props => {
  const classes = useStyles();
  const {
    categoryTitle, 
    userData,
  } = props;

  const isMyList = categoryTitle === 'My List';
  const channelRoute = getChannelRoute(categoryTitle);
  const ENDPOINT = getPlayListEndpoint(categoryTitle);

  //if my list exists, 

  const [resultData, setResultData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(ENDPOINT, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(data => {
      const result = getVideoDataFromPlayList(data);            
      setLoading(false);
      setResultData(result);
    })
    .catch(err => {
      setLoading(false);
      setError(err);
    });
  }, [ENDPOINT, userData]);

  //get result data

  console.log(resultData)

  if(!resultData && ENDPOINT && loading) return (
    <div className={classes.section}>
      <div className={classes.container}>
        <CircularLoading />
			</div>
    </div>
  );

  if(!ENDPOINT)  return (
    <div className={classes.section}>
      <div className={classes.container}>
                <GridContainer justify='center'>
                    {printTitle(categoryTitle, classes.title)}
                    <NotAvailable className={classes.detail}/>                    
                </GridContainer>
      </div>
    </div>
  );

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer justify='center'>
          {printTitle(categoryTitle, classes.title)}                    
          <PrintVideoCarousel 
            resultData={(resultData && !error) ? resultData
              : SampleVideoList
            }
          />
          {/*채널 상세 페이지*/}
          {(channelRoute && !isMyList) && (
            <GridItem 
              xs={12} sm={12} md={11} 
              style={{textAlign: 'right'}}
            >
							<Link to = {channelRoute}>
								<h5 className={classes.link}>
                  view more about {categoryTitle}...
                </h5>
              </Link>
            </GridItem>
          )}
          {isMyList && (
            <GridItem 
              xs={12} sm={12} md={11} 
              style={{textAlign: 'right'}}
						>
              <h5 className={classes.link}>
                go to your own play list!
              </h5>
            </GridItem>
          )}
        </GridContainer>
      </div>
    </div>
  )
}

VideoCarouselSection.propTypes = {
  props: PropTypes.object,
  userData: PropTypes.object,
}

export default React.memo(VideoCarouselSection)
